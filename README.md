# **README.md**

## Database of Museums in Washington, DC
## User Manual

### Description
Washington, DC is known to be a popular tourist area for American citizens as well as people visiting from outside of the country. The number of different museums and their daily visitors, transactions, hours, employees, and locations can be overwhelming for management to sift through. Our website aims to create a data set containing useful information for the museum management that includes visitor data, employee data, and facility data. This information will help museum staff manage operations more efficiently.

![Photo of Crowd of People]("../images/museum-2.jpg")

### Link to Website
https://team15-museum.herokuapp.com

### Target Browsers
Macbook Pro 13/15




# **Developer Manual**

### How to install application and all dependencies
1. Clone this repository through Github Desktop or through Terminal.
2. Open repository in VSCode Terminal or Terminal application.
3. Type npm install into the terminal window and run.
4. The application should now be set to use.
### How to run application on a server
1. Open repository in VSCode terminal or Terminal application.
2. Run npm start. There should be no errors.
3. In a web browser, go to url: http://localhost:3000/
### To run tests for software
The are no prewritten tests in the source repository, but you can use Cypress to run your own written tests.
1. Open two terminals and make sure you are in the main project directory
2. In the first terminal, run npm start.
3. In the second terminal run npm test.
# Server application APIs
# **/api - API route for greeting the user to the website.**
### Request
`GET /` 
### Response
```'Welcome to Museum App!'.```

# **/museum_staff - API route for museum staff.**
### Request
`GET /museum_staff` 
### Response
```'findAll'```
### Request
`GET /museum_staff/:staff_id` 
### Response
```
  {
      staff_id: req.params.staff_id
  }
```
### Request
`POST /museum_staff`
### Response
  ```
  {
      const newStaff = await db.MuseumStaff.create({
      staff_id: currentId,
      employee_first_name: req.body.employee_first_name,
      employee_last_name: req.body.employee_last_name,
      museum_id: req.body.museum_id,
      role_id: req.body.role_id
   }
   ```
### Request
`PUT /museum_staff`
### Response
```
  {
      employee_first_name: req.body.employee_first_name,
      employee_last_name: req.body.employee_last_name
  }
  ```
### Request
`DELETE /museum_staff/:staff_id`
### Response
 ```Succesfully Deleted```
 
# **/staff_role - API route for staff roles.**

### Request
`GET /staff_role`
### Response 
```'findAll'```
### Request
`GET /staff_role/:role_id`
### Response
```
  {
      role_id: req.params.role_id
  }
  ```
### Request
`POST /staff_role`
### Response
```
  {
      const newRole = await db.StaffRole.create({
      role_id: currentId,
      role_title: req.body.role_title
   }
   ```
### Request
`PUT /staff_role`
### Response
```
  {
      role_id: req.body.role_id,
      role_title: req.body.role_title
   }
   ```
### Request
`DELETE /staff_role/:role_id`
### Response
  ```Successfully Deleted```


# **/Museum_info - API route for general museum information.**

### Request
`GET /Museum_info`
### Response
```'findAll'```
### Request
`GET /Museum_info/:museum_id`
### Response
```
  {
      museum_id: req.params.museum_id
  }
  ```
### Request
`POST /Museum_info`
### Response
```
  {
      museum_id: currentMuseumId,
      museum_name: req.body.museum_name,
      museum_email: req.body.museum_email,
      museum_url: req.body.museum_url,
      museum_phone_num: req.body.museum_phone_num,
      museum_entry_fee: req.body.museum_entry_fee,
      museum_open_time: req.body.museum_open_time,
      date_museum_opened: req.body.date_museum_opened,
      museum_capacity: req.body.museum_capacity,
      museum_size: req.body.museum_size,
      museum_parent: req.body.museum_parent,
      museum_close_time: req.body.museum_close_time,
      museum_budget: req.body.museum_budget,
      museum_address: req.body.museum_address,
      museum_city: req.body.museum_city,
      museum_zipcode: req.body.museum_zipcode,
      ada_id: req.body.ada_id
   }
   ```
### Request
`PUT /Museum_info`
### Response
  ```
  {
        museum_name: req.body.museum_name,
        museum_email: req.body.museum_email,
      	museum_url: req.body.museum_url,
        museum_phone_num: req.body.museum_phone_num,
        museum_entry_fee: req.body.museum_entry_fee,
        museum_open_time: req.body.museum_open_time,
        date_museum_opened: req.body.date_museum_opened,
        museum_capacity: req.body.museum_capacity,
        museum_size: req.body.museum_size,
        museum_parent: req.body.museum_parent,
        museum_close_time: req.body.museum_close_time,
        museum_budget: req.body.museum_budget,
        museum_address: req.body.museum_address,
        museum_city: req.body.museum_city,
        museum_zipcode: req.body.museum_zipcode,
        ada_id: req.body.ada_id
    }
```
### Request
`DELETE /Museum_info/:museum_id`
### Response
  ```Successfully Deleted```
   
   
# **/wholeVisitor - API route for visitors.**

### Request
`GET /visitors`
### Response
```'findAll'```
### Request
`GET /visitors/:visitor_id`
### Response
```
  {
      visitor_id: req.params.visitor_id
  }
```
### Request
`POST /visitors`
### Response
```
  {
      visitor_id: curId,
      visitor_fn: req.body.vistor_fn,
      visitor_ln: req.body.visitor_ln,
      visitor_phone_num: req.body.visitor_phone_num,
      visitor_email: req.body.visitor_email
   }
```
### Request
`PUT /visitors`
### Reponse
```
  {
      visitor_phone_num: req.body.visitor_phone_num,
      visitor_email: req.body.visitor_email
  }
```
### Request
`DELETE /visitors/:visitor_id`
### Response
   ```Successfully Deleted```
   

# **/visitor_transaction - API route for visitor transactions.**

### Request
`GET /visitor_transaction`
### Response
```'findAll'```
### Request
`GET /visitor_transaction/:transaction_id`
### Response
```
  {
      transaction_id: req.params.transaction_id
  }
```
### Request
`POST /visitor_transaction`
### Response
```
  {
      const newVisTran = await db.VisitorTransactions.create({
      transaction_id: curId,
      visitor_id: req.body.visitor_id,
      visitor_transactions: req.body.visitor_transactions
   }
```
### Request
`PUT /visitor_transaction`
### Response
```
  {
      visitor_transactions: req.body.visitor_transactions,
      visitor_id: req.body.visitor_id
  }
```
### Request
`DELETE /visitor_transaction/:transaction_id`
### Response
   ```Succesfully Deleted```
   
   
   
# **/ada_compliance - API route for ada compliance.**

### Request
`GET /ada_compliance`
### Response
```'findAll'```
### Request
`GET /ada_compliance/:ada_id`
### Response
```
  {
      ada_id: req.params.ada_id
  }
```
### Request
`POST /ada_compliance`
### Response
```
  {
      const newAda = await db.AdaCompliance.create({
      ada_id: currentId,
      ada_type: req.body.ada_type
  }
```
### Request
`PUT /ada_compliance`
### Response
```
  {
      ada_id: req.body.ada_id,
      ada_type: req.body.ada_type
  }
```
### Request
`DELETE /ada_compliance/:ada_id`
### Response
   ```Successfully Deleted```
   
   
# **/museum_visits - API route for museum visits.**

### Request
`GET /museum_visits`
### Response
```'findAll'```
### Request
`GET /museum_visits/:visitor_id`
### Response
```
  {
       visitor_id: req.params.visitor_id
  }
```
### Request
`POST /museum_visits`
### Response
```
  {
      const newVisit = await db.MuseumVisits.create({
      vistor_id: currentId,
      museum_id: req.body.museum_id,
      visit_date: req.body.visit_date,
      member_status: req.body.member_status
   }
```
### Request
`PUT /museum_visits`
### Response
```
  {
        visitor_id: req.body.visitor_id,
        museum_id: req.body.museum_id,
        visit_date: req.body.visit_date,
        member_status: req.body.member_status
   }
```
### Request
`DELETE /museum_visits/:visitor_id`
### Response
   ```Succesfully Deleted```

# Known Bugs and Future Development
## Bugs


## Future Development
- Implementing a map on one of the museum pages
