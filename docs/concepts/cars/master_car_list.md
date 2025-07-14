---
icon: material/identifier
---

# :material-identifier: Master Car List

!!! note
    This list is taken from GT6 1.00. 

    It was generated with the following SpecDB query:

    ```sql
    SELECT CarID, "`" || CarLabel || "`" as CarLabel, Name, (substr('0000' || ModelCode, -8,4) || "/" || substr('0000' || ModelCode, -4, 4)) as ModelPath from GENERIC_CAR 
    LEFT JOIN CAR_NAME_ALPHABET
    ON GENERIC_CAR.CarID = CAR_NAME_ALPHABET.LabelID;
    ```

    **TODO: Cover all databases from all known games.**

{{ read_csv('master_car_list.csv') }}