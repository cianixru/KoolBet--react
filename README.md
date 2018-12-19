# betting-reactjs-superapp

### How to run on local machine

* Clone project, open dir, choose **dev** branch

    ```bash
    git clone git@mtl-git02.pbt.com.mt:MBS/betting-reactjs-superapp.git
    cd betting-reactjs-superapp
    git checkout dev
    ```

* Install dependencies

    ```bash
    npm install
    ```

* And run development server (on **3000** port by default)

    ```bash
    npm start
    ```

* You can run tests with

    ```bash
    npm test
    ```

### Auto-deploy hooks

| Branch    | Host                                                    | Description             |
|-----------|---------------------------------------------------------|-------------------------|
| staging5  | [http://192.168.1.55/sport](http://192.168.1.55/sport)  | Demo 5 frontend server  |
|   |   |   |
|   |   |   |

### FAQ

* Where is I can get data? Which backend I can use?

    You need **betting-api-gateway**. It allow JSON RPC request with token authorization.

* Why I see error with 400 status code?

    Maybe your request to backend has invalid body or has not all required params.
    
    OR, it's BSMHub unhandled error inside betting-api-gateway 

* Where is saved visual React components?

        src/view/components

* How to find backend call (fetch) in code?

    You can find all backend urls here:

        src/config/constants.js
    
    find URL what you need and find usages of it.