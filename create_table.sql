SET SCHEMA <your schema>;

CREATE COLUMN TABLE CUSTOMERS (
	ID INTEGER NOT NULL,
	FIRST_NAME varchar(250) NULL,
	LAST_NAME varchar(250) NULL,	
	COMPANY_NAME varchar(250) NULL,
	ADDRESS varchar(250) NULL,
	CITY varchar(250) NULL,		
   	COUNTRY varchar(250) NULL,	
	ZIP varchar(10) NULL,
	PHONE varchar(30) NULL,	
	EMAIL varchar(80) NULL,
	WEB varchar(250) NULL,
	TA_TOKEN varchar(500) NULL
   	 );
   	 
-- fulltext search / optimized for fuzzy search
Create FullText Index "FUZZY_SEARCH_INDEX" On "CUSTOMERS"("TA_TOKEN")
FUZZY SEARCH INDEX ON
FAST PREPROCESS on;
