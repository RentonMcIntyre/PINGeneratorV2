# PINGeneratorV2
A modified version of the PIN Generation App originally created for Intellicore's Recruitment assessment.

This version is a Full Stack application containing:
  * An Angular frontend (the same from the original version, with the logic stripped out)
  * A C# based API and Service Layer, using Dapper as an ORM for Data Handling
  * A Microsoft SQL Server Database (including some Stored Procedures as I still believe handling great quantities of data is best suited to the DBMS itself)
 
To Use:
  * C# Application has been setup to be run in Visual Studio
    * In PinGenerator.API/appsettings.json, the DefaultConnectionString may need to be changed if required, though should be generic for local use.
  * Angular App can be run via "ng serve" as per standard, I have not included it within the VS Solution
  * A SQL Server database will be required. I have provided a backup of my SQL DB and its contents (including Stored Procedures) for ease of use.
  
_A note on the decision to use Dapper:
I opted to use Dapper for communication with the Database instead of completely hand writing SQL connections. I believe this is a significantly better option than using Entity Framework, which introduces some large performance penalties. I also believe that Dapper provides good granular control of SQL commands (unlike EF which works primarily on generated models), so is not a significant detraction from the granular control given by writing a more low level execute/read solution using SqlConnection._
