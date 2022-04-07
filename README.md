
# fetch-takehome

This is a basic RESTful API implementation for managing a user's rewards points.

## Outline
A user recieves points from specific payers. The User can spend their available 
points whenever. Those points are spent from oldest transaction date to newest
without considering which payer they came from. 

The API handles this by allowing http requests to add transactions, 
spend points, and to retrieve data about payers and the points they've 
provided.
 
* One can add a transaction via a `POST` to the `/points` route by specifying the `payer`, the amount of `points` (negative or positive), and the `timestamp`.

* One can also spend points via a `POST` to the `/points/spend` route by specifying the amount of `points`

* One can return all payer-point balances via a `GET` to the `/points` route.

## Usage

This project runs with [Node.js](https://nodejs.org/) and requires you to have it installed and up-to-date.

Please click on the Node.js hyperlink above to go to the Node website and choose your download. 
Follow the installation instructions or check if you have node installed via this command:
```
node --version
```

### Step 1: Clone or Download repository
If you have git installed, clone this repo on your machine by navigating via command line to your desired folder and typing:
```
git clone https://github.com/dangerdavey/fetch-takehome.git
```

If you do not have git installed then either download and install git or you can download this repository in the upper right as a zip file and unzip it into your desired folder.

### Step 2: Navigate to folder and install dependencies
Either open the command line in the project folder or navigate to the folder from the command line using the command below. You need to replace the path with that of your folder containing the index.js file.
```
cd /your/path/to/the/folder/fetch-takehome
```
Once you are in the project folder/directory, run this command:
```
npm install
```
This will install all of the dependencies listed at the bottom of this README.

### Step 3: Start the Server
You can start the local server by running the command below in the same command line window as before:
```
npm start
```
The server should now be running and it should indicate this via a message on the command line. You should see `it's working! http://localhost:8080` printed to the screen.
### Step 4: Set-up for making API calls
Note: I have set up the ability to run unit tests with mocha and chai if you don't want to send requests to test it yourself. The instructions for running the unit tests can be found near the end of this README in the "Runnin Unit Tests" Section.

Otherwise if you wish to test this API with your own requests:
* First navigate to the [Postman](https://www.postman.com/) website. 
* Next create an account or log in.
* Next from your home screen, locate the workspaces tab in the upper left of the screen and either create a new one or enter an existing one.
* Now in the upper left there should be a button titled `new`. Click on that button and select `HTTP Request`.
>![Capture 1](/images/Capture1.jpg)
>![Capture 2](/images/Capture2.jpg)

### Step 5: Making POST API calls to add transactions
You should now see a screen that looks like this:
>![Capture 3](/images/Capture3.jpg)
We will begin by teaching you how to POST transactions

* In the screenshot above the dropdown is opened. Open the dropdown yourself and select the `POST` option. 
* In the text input that says `Enter request URL` enter the address below
```
http://localhost:8080/points
```
* Next click on the body tab and select raw as seen in the screenshot below.
>![Capture 4](/images/Capture4.jpg)
* You'll want to paste the below data into the body.
```
{ "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" }

```
* Once you're ready you can click send. 

There is a list of these transactions in the above form in the file transactions.txt. You can repeat this process with those that follow this request in order to load transactions in for further testing

NOTE: You can check to make sure the transactions were added correctly by changing the http verb i.e. `POST` to `GET` and sending the request.

### Step 6: Spending Points

* You can start by making sure the http verb in the request dropdown (i.e. `GET` or `POST`) is set to `POST` 
* Next you can change the address from:
```
http://localhost:8080/points
```
to
```
http://localhost:8080/points/spend
```
* Then, like before, go to the body of the request, make sure that it is set to raw and enter 
```
{ "points": 5000 }
```
* You can change the number of points however you'd like to see what happens when too many points are being spent or when an amount within the total points is being spent. 

You can check to see how the points in the system have been updated by changing the address in the request back to 
```
http://localhost:8080/points
```
and changing the http verb back to `GET` and sending the request. 

## Running Unit tests
I have written a small amount of unit tests that you can run.

* In your command line, navigate to the folder containing index.js
* Once there you can run the command:
```
npm test
```
This should run all of the tests I have written. 
NOTE: If you have not stopped the server from the Usage steps and you wish to use the same command line window. Simply press `CTRL` + `C` to quit. Now you will be free to run the tests.

# Dependencies

* [Node](https://nodejs.org/) 
* [Express](https://expressjs.com/) 
* [Mocha](https://mochajs.org/) 
* [Chai](https://www.chaijs.com/) 
* [Chai HTTP](https://www.npmjs.com/package/chai-http) 