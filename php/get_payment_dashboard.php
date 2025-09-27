<?php
 include 'db_head.php';

  $team_id = test_input($_GET['team_id']);

 
 
function test_input($data) {
$data = trim($data);
$data = stripslashes($data);
$data = htmlspecialchars($data);
$data = "'".$data."'";
return $data;
}



 

$sql = <<<SQL
SELECT
    collection_date,
    expected_amount,
    total_paid,
    pay_history,
    his_html,
    @running_balance := @running_balance +(expected_amount - total_paid) AS pending_balance,
    CASE WHEN @running_balance <= 0 THEN 0 ELSE @running_balance
END AS amount_to_pay,
CASE WHEN @running_balance < 0 THEN ABS(@running_balance) ELSE 0
END AS available_advance,
CASE WHEN @running_balance < 0 THEN 'Advance Paid' WHEN total_paid = 0 THEN 'No Payment' WHEN total_paid >= expected_amount THEN 'Paid' ELSE 'Partially Paid'
END AS sts
FROM
    (
    SELECT
        fp.collection_date,
        fp.pay_amount AS expected_amount,
        IFNULL(SUM(mp.paid_amount),
        0) AS total_paid,
          ul("",
       GROUP_CONCAT(
            li(
                CONCAT(
                    div_fun(
                        'd-flex justify-content-between',
                        CONCAT(
                            p('small', mp.paid_date),
                            p('small', mp.paid_amount),
                            p(
                                'small',
                                if(
                                    mp.is_paid = 1,
                                    '<i class="fa-solid fa-circle-check text-success"></i>',
                                    '<i class="fa-brands fa-google-pay text-secondary"></i>'
                                )
                            )
                        )
                    )
                )
            ) separator ''
        ) ) as his_html,
        GROUP_CONCAT(mp.paid_amount) AS pay_history
    FROM
    finance_payment fp
LEFT JOIN memberspayment mp ON
    mp.member_id = fp.member_id AND IF(
        mp.paid_date <= fp.collection_date,
        1,
        IF(
            (
            SELECT
                MAX(finance_payment.collection_date)
            FROM
                finance_payment
            WHERE
                finance_payment.member_id = $team_id 
        ) < fp.collection_date,1,0
        )
    ) AND mp.paid_date > IFNULL(
        (
        SELECT
            MAX(fp2.collection_date)
        FROM
            finance_payment fp2
        WHERE
            fp2.collection_date < fp.collection_date AND fp2.member_id = fp.member_id
    ),
    '0000-00-00'
    )
WHERE
    fp.member_id = $team_id 
GROUP BY
    fp.collection_date,
    fp.pay_amount
ORDER BY
    fp.collection_date
) AS t,
(
SELECT
    @running_balance := 0
) AS vars 
ORDER BY `t`.`expected_amount` ASC 
SQL;




$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $rows = array();
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    print json_encode($rows);
} else {
  echo "0 result";
}
$conn->close();



