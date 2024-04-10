<h1>digits-semantic-ui</h1>
<img src="doc/landing-page.png" width="600">

<p>Digits is an application that allows users to:</p> 
<ul>
  <li>Register an account.</li>
  <li>Create and manage a set of contacts.</li>
  <li>Add a set of timestamped notes regarding their interactions with each contact.</li>
</ul>
## Installation

<p>First, [install Meteor](https://www.meteor.com/install).</p>

<p>Second, go to [download a copy of Digits.](https://github.com/bhnakata/digits/tree/main) Note that Digits is a private repo and so you will need to request permission from the author to gain access to the repo.</p>

<p>Third, go to your newly created repository, and click the "Clone or download" button to download your new GitHub repo to your local file system.  Using [GitHub Desktop](https://desktop.github.com/) is a great choice if you use MacOS or Windows.</p>

<p>Fourth, cd into the app/ directory of your local copy of the repo, and install third party libraries with:</p>

```
$ meteor npm install
```

## Running the system

Once the libraries are installed, you can run the application by invoking the "start" script in the [package.json file](https://github.com/ics-software-engineering/meteor-application-template-react/blob/master/app/package.json):

```
$ meteor npm run start
```

The first time you run the app, it will create some default users and data. Here is the output:

```
> meteor-application-template-react@ start /Users/carletonmoore/GitHub/ICS314/meteor-application-template-react/app
> meteor --no-release-check --exclude-archs web.browser.legacy,web.cordova --settings ../config/settings.development.json

[[[[[ ~/GitHub/ICS314/meteor-application-template-react/app ]]]]]

> meteor-application-template-react@ start C:\Users\bhnak\Documents\GitHub\digits\app
> meteor --no-release-check --exclude-archs web.browser.legacy,web.cordova --settings ../config/settings.development.json

[[[[[ C:\Users\bhnak\Documents\GitHub\digits\app ]]]]]

=> Started proxy.
=> Started HMR server.
=> Started MongoDB.                           
=> Started your app.                          

=> App running at: http://localhost:3000/
   Type Control-C twice to stop.

```

Periodically, you might see `Error starting Mongo (2 tries left): Cannot run replSetReconfig because the node is currently updating its configuration` after the `=> Started HMR server.`. It doesn't seem to be a problem since the MongoDB does start.

### Viewing the running app

If all goes well, the template application will appear at [http://localhost:3000](http://localhost:3000).  You can login using the credentials in [settings.development.json](https://github.com/bhnakata/digits/blob/main/config/settings.development.json), or else register a new account.

### ESLint

You can verify that the code obeys our coding standards by running ESLint over the code in the imports/ directory with:

```
meteor npm run lint
```

## User Interface Walkthrough

### Landing Page
<p>When you first bring up the application, you will see the landing page that provides a brief introduction to the capabilities of Digits:</p>
<img src="doc/landing-page.png" width="600">

### Register
<p>If you do not yet have an account on the system, you can register by clicking on “Login”, then “Sign Up”:</p>
<img src="doc/register-page.png" width="600">

### Sign in
<p>Click on the Login link, then click on the Signin link to bring up the Sign In page which allows you to login:</p>
<img src="doc/signin-page.png" width="600">

### User home page
<p>After successfully logging in, the system takes you to your home page. It is just like the landing page, but the NavBar contains links to list contact and add new contacts:</p>
<img src="doc/userhome-page.png" width="600">

### List Contacts
<p>Clicking on the List Contacts link brings up a page that lists all of the contacts associated with the logged in user:</p>
<img src="doc/listcontacts-page.png" width="600">
<p>This page also allows the user to add timestamped “notes” detailing interactions they’ve had with the Contact. For example:</p>
<img src="doc/addnote-page.png" width="600">

### Edit Contacts
<p>From the List Contacts page, the user can click the “Edit” link associated with any Contact to bring up a page that allows that Contact information to be edited:</p>
<img src="doc/editcontact-page.png" width="600">

### Admin mode
<p>It is possible to designate one or more users as “Admins” through the settings file. When a user has the Admin role, they get access to a special NavBar link that retrieves a page listing all Contacts associated with all users:</p>
<img src="doc/adminlist-page.png" width="600">

