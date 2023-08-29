# SQL Query Viewer and Data Display (Dummy project for an assessment )

## Basic Overview

This tool empowers users to effortlessly retrieve and visualize data from their database using SQL queries. The sample data pertains to job openings, including details such as position, openings, country, and company. Enter queries according to your needs to obtain the desired output. There are three methods for entering queries:

1) Textarea: Users can input their desired SQL queries in a provided textarea. Upon pressing the search button, the data will be presented in a table format.

2) Dropdown Menu: A dropdown menu contains pre-written SQL queries. Users can select an SQL query from the dropdown and press the search button to retrieve the desired table.

3) Dropdown Bars: Various dropdown bars correspond to common SQL query statements like GROUP BY, Aggregate functions, and ORDER BY openings. Dropdowns are also available for attributes such as Position, Company, and Country, allowing data retrieval based on selected values.

### Caution
Please be aware that the SQL queries and table data reflected after querying are not accurate; they are solely for demonstration purposes. No query validation or syntax validation is implemented.

## Frameworks
This project employs React.js as the JavaScript framework, in addition to HTML and CSS. No other major plugins or frameworks have been utilized.

## Page Load Time

The page load time of the deployed application is approximately 1 second during the initial load. Subsequent loads are nearly instantaneous. This measurement was determined using a stopwatch initiated immediately after accessing the endpoint in the web browser.

## Optimisations
To ensure a seamless user experience and prevent potential crashes, the project incorporates the following optimizations:

 1) Pagination: Given the potential copiousness of retrieved data, pagination is implemented to display only 6 data entries at a time. Rendering all data simultaneously might overwhelm the website.

 2) Dropdown menus offer predefined SQL query components. These filters can assist users in generating precise queries. Users can utilize the generated queries from these dropdowns within the textarea, particularly if implementing multiple nested queries.

 ## Steps to Run locally

 1) Clone the repo.
 2) npm start

 Key Observation: If you want to get all the data without any sort of filter, just empty any of the section and press search button.

 ## Deployed link
 Link: https://64ee286112adfc007162beb2--imaginative-conkies-c65053.netlify.app
