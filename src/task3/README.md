## Usage

- **Get Users**
Returns json data about stored users sorted by login property.

<details>

* **URL**

    https://localhost:3000/api/v1/users

* **Method:**

    `GET`

* **Query Params**

    **Optional:**
 
    `loginSubstring=[string]`
  
    `limit=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
      [
        {
            "id": "1",
            "login": "testUser2",
            "password": "testUser2",
            "age": 20,
            "isDeleted": false
        },
        {
            "id": "2",
            "login": "testUser3",
            "password": "testUser3",
            "age": 26,
            "isDeleted": false
        }
      ]
    ```

</details>

- **Get User**
Returns json data about stored user.

<details>

* **URL**

    https://localhost:3000/api/v1/user/:id

* **Method:**

    `GET`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
        {
            "id": "1",
            "login": "testUser2",
            "password": "testUser2",
            "age": 20,
            "isDeleted": false
        }
    ```

* **Error Response:**

  * **Code:** 404 CAN NOT FIND USER WITH SUCH ID

</details>

- **Create User**
Add new user to stored users.

<details>

* **URL**

    https://localhost:3000/api/v1/users

* **Method:**

    `POST`

* **Data Params**

    ```typescript
      {
        login: string,
        password: string,
        age: number,
        isDeleted: boolean,
      }
    ```

    **Required:**

   ```all fields are required;
      login validation is required;
      password must contain letters and numbers;
      user’s age must be between 4 and 130.
    ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
        {
            "id": "1",
            "login": "testUser2",
            "password": "testUser2",
            "age": 20,
            "isDeleted": false
        }
    ```

</details>

- **Update User**
Update user from stored users.

<details>

* **URL**

    https://localhost:3000/api/v1/users/:id

* **Method:**

    `PUT`

* **Data Params**

    ```typescript
      {
        login?: string,
        password?: string,
        age?: number,
        isDeleted?: boolean,
      }
    ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
        {
            "id": "1",
            "login": "testUser2",
            "password": "testUser2",
            "age": 20,
            "isDeleted": false
        }
    ```

* **Error Response:**

  * **Code:** 404 CAN NOT FIND USER WITH SUCH ID

</details>

- **Delete User**
Toggle user isDeleted flag to true.

<details>

* **URL**

    https://localhost:3000/api/v1/users/:id

* **Method:**

    `DELETE`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
        {
            "id": "1",
            "login": "testUser2",
            "password": "testUser2",
            "age": 20,
            "isDeleted": true
        }
    ```

* **Error Response:**

  * **Code:** 404 CAN NOT FIND USER WITH SUCH ID

</details>