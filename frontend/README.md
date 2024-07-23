# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


### SQL queries for creating `seat_allocation, business_unit, manager_allocation` tables in `seat-allocation-db` database
CREATE TABLE business_unit (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    manager VARCHAR(100),
    role VARCHAR(100)
);

INSERT INTO business_unit(name, manager, role)
VALUES ('cloud', 'Hima Bindhu', '5664'),
		('service', 'Ashish Jain', '5264'),
		('cloud', 'John Abram', '5384');

SELECT * FROM seat_allocation;
CREATE TABLE seat_allocation (
    id SERIAL PRIMARY KEY,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
	campus VARCHAR(100),
    floor INTEGER NOT NULL,
    total INTEGER NOT NULL,
    bu_id INTEGER REFERENCES business_unit(id),
    seats INTEGER[] 
);

INSERT INTO seat_allocation (country, city, state, campus, floor, total, bu_id, seats)
VALUES ('India', 'Hyderabad', 'Telengana', 'Knowledge City', 5, 200, 1, '{1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
														11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
														21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 
														31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
														41, 42, 43, 44, 45, 46, 47, 48, 49, 50}'),
		('India', 'Hyderabad', 'Telengana', 'Knowledge City', 6, 160, 2, '{51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 
														61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 
														71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 
														81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 
														91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 
														101, 102, 103, 104, 105}'),
		('UK', 'London', 'England', 'Gresham Street', 10, 180, 3, '{106,107,108,109,110,111,112,113,114,115, 
													116,117,118,119,120,121,122,123,124,125, 
													126,127,128,129,130, 131,132,133,134,135,
													136,137,138,139,140,141,142,143,144,145, 
													146, 147, 148, 149, 150, 151, 152, 153, 154, 155,
													156, 157, 158, 159, 160}'),
		('India', 'Hyderabad', 'Telengana', 'Mindspace', 7, 150, 1, '{51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 
														61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 
														71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 
														81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 
														91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 
														101, 102, 103, 104, 105}'),
		('India', 'Hyderabad', 'Telengana', 'Knowledge City', 6, 170, 1, '{106,107,108,109,110,111,112,113,114,115, 
													116,117,118,119,120,121,122,123,124,125, 
													126,127,128,129,130, 131,132,133,134,135,
													136,137,138,139,140,141,142,143,144,145, 
													146, 147, 148, 149, 150, 151, 152, 153, 154, 155,
													156, 157, 158, 159, 160}');

CREATE TABLE manager_allocation (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(100),
	last_name VARCHAR(100),
	business_unit VARCHAR(100),
	campus VARCHAR(100),
	floor INT,
	seats_array INT[],
	hoe_id INT REFERENCES business_unit(id)
);


INSERT INTO manager_allocation (first_name, last_name, business_unit, campus, floor, seats_array, hoe_id)
VALUES ('David', 'Brown', 'cloud', 'Knowledge City', 5, '{1,2,3,4,5,6,7,8,9,10}', 1),
		('Emma', 'Davis', 'cloud', 'Knowledge City', 5, '{11,12,13,14,15,16,17,18,19,20,21,22,23,24,25}', 1),
		('Frank', 'Miller', 'cloud', 'Knowledge City', 5, '{26,27,28,29,30}', 1),
		('George', 'Wilson', 'service', 'Knowledge City', 6, '{51,52,53,54,55,56,57}', 2),
		('Helen', 'Moore', 'service', 'Knowledge City', 6, '{58,59,60,61,62,63,64,65,66,67,68,69,70,71}', 2),
		('Irene', 'Taylor', 'service', 'Knowledge City', 6, '{72,73,74,75,76,77,78,79,80,81,82,83,84}', 2),
		('Jack', 'Anderson', 'cloud', 'Gresham Street', 10, '{106,107,108,109,110,111,112,113,114,115}', 3),
		('Karn', 'Thomas', 'cloud', 'Gresham Street', 10, '{116,117,118,119,120,121,122,123,124,125,126,127,128,129,130}', 3),
		('Larry', 'Martinez', 'cloud', 'Gresham Street', 10, '{131,132,133,134,135,136,137,138,139,140,141,142,143,144,145}', 3),
		('Oscar', 'Bennett', 'cloud', 'Mindspace', 7, '{51,52,53,54,55,56,57}', 1),
		('Penelope', 'Clark', 'cloud', 'Mindspace', 7, '{58,59,60,61,62,63,64,65,66,67,68,69,70,71}', 1),
		('Quentin', 'Diaz', 'cloud', 'Mindspace', 7, '{72,73,74,75,76,77,78,79,80,81,82,83,84}', 1),
		('Rebecca', 'Foster', 'cloud', 'Knowledge City', 6, '{106,107,108,109,110,111,112,113,114,115}', 1 ),
		('Simon', 'Grant', 'cloud', 'Knowledge City', 6, '{116,117,118,119,120,121,122,123,124,125,126,127,128,129,130}', 1 ),
		('Tessa', 'Hughes', 'cloud', 'Knowledge City', 6, '{131,132,133,134,135,136,137,138,139,140,141,142,143,144,145}', 1 );