# Getting Started (This project is going through migration in this branch)


In the terminal:
Navigate into the client folder and do an 'npm install' to install the needed dependencies 

Open another terminal:
Then navigate to the server folder and do an 'npm install' to install the needed dependencies

You will need a mongoDB connection URL to put into the CONNECT_URL environment variable in the .env file of the server folder
Setting up a MongoDB cluster is free so use some online resources to figure out how to do so. 
If you wish to skip this step then simply go to client -> src -> api -> index.js 
and comment out the localhost base url and use the base URL for the backend I already have deployed.

After dependencies are installed:
If you are using your own MongoDB cluster then type 'npm start' in the server side terminal.

Then do the same for the client side terminal