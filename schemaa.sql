-- CREATE DATABASE fitness_plan_database; 
-- USE fitness_plan_database; 
 
--  CREATE TABLE PaymentFormTable (   
--     ID integer PRIMARY KEY AUTO_INCREMENT,   
--     FullName TEXT NOT NULL,   
--     Age TEXT NOT NULL,   
--     Email TEXT NOT NULL,
--      PhoneNumber TEXT NOT NULL,   
--     Information LONGTEXT NOT NULL,   
--     Created TIMESTAMP NOT NULL DEFAULT NOW(), 
--      Product LONGTEXT NOT NULL,   
--     Amount TEXT NOT NULL,   
--     PromoCode TEXT NOT NULL,
--      Referralcode TEXT NOT NULL 
   --  );  

   --  INSERT INTO notes (title, contents) 
   --  VALUES 
   --   ('My First Note', 'A note about something'), 
   --   ('My Second Note', 'A note about something else');



USE fitness_plan_database; 
 
 CREATE TABLE FitnessPromoCode (   
    ID integer PRIMARY KEY AUTO_INCREMENT,   
    PromoCode TEXT NOT NULL,   
    PercentOff TEXT NOT NULL,   
    Password TEXT NOT NULL, 
    Created TIMESTAMP NOT NULL DEFAULT NOW(), 
    AmountPaid LONGTEXT NOT NULL   

    );  

        INSERT INTO FitnessPromoCode (PromoCode, PercentOff,Password,AmountPaid) 
    VALUES 
     ('MKA40', '40','fK!G3JM&j4','0 $');



USE fitness_plan_database; 
 
 CREATE TABLE PaymentTable (   
    ID integer PRIMARY KEY AUTO_INCREMENT,   
    FullName TEXT NOT NULL,   
    Age TEXT NOT NULL,   
    Email TEXT NOT NULL,
     PhoneNumber TEXT NOT NULL,   
    Information LONGTEXT NOT NULL,   
    Created TIMESTAMP NOT NULL DEFAULT NOW(), 
     Product LONGTEXT NOT NULL,   
    Amount TEXT NOT NULL,   
    PromoCode TEXT NOT NULL,
     Referralcode TEXT NOT NULL ,
     PaymentMethod TEXT NOT NULL ,
      PaymentID TEXT NOT NULL ,
      OrderID TEXT NOT NULL ,
   AccessToken TEXT NOT NULL 
       );  
 INSERT INTO PaymentTable (FullName, Age,Email,PhoneNumber,Information,Product,Amount,PromoCode,Referralcode,PaymentMethod,PaymentID,OrderID,AccessToken)
  VALUES ("Ajay","15","sudoajay@gmail.com","956865","india","Items","45 $","AJA50","AJA50","Papal","asdas","asda","asdasa")



USE fitness_plan_database; 
 
 CREATE TABLE FitnessFreeFormTable (   
    ID integer PRIMARY KEY AUTO_INCREMENT,   
    FullName TEXT NOT NULL,   
    Age TEXT NOT NULL,   
    Email TEXT NOT NULL,
     PhoneNumber TEXT NOT NULL,   
    Information LONGTEXT NOT NULL,   
    Created TIMESTAMP NOT NULL DEFAULT NOW()
       );  



USE fitness_plan_database; 
 
 CREATE TABLE AppInformationTable (   
    ID integer PRIMARY KEY AUTO_INCREMENT,   
    AppTitle TEXT NOT NULL,   
    AppDescription TEXT NOT NULL,   
    AppKeywords TEXT NOT NULL,
     MainTitle TEXT NOT NULL,   
    MainDescription TEXT NOT NULL,   
    Created TIMESTAMP NOT NULL DEFAULT NOW()
       );  
INSERT INTO AppInformationTable (AppTitle, AppDescription,AppKeywords,MainTitle,MainDescription)
  VALUES ("Sudoajay","Hello Description app","AppKeywords" , "Welcome to site" , "have  purchase anything")

   IF EXISTS (SELECT * FROM AppInformationTable WHERE id = 1)
    BEGIN
    UPDATE AppInformationTable SET AppTitle = "hello" , AppDescription ="hello description"  ,AppKeywords ="hello keywords" , MainTitle ="hello maintitle" , 
    MainDescription="hello Main description" WHERE id = 1
    
   END
   ELSE
   BEGIN
 INSERT INTO AppInformationTable (AppTitle, AppDescription,AppKeywords,MainTitle,MainDescription)
  VALUES ("Sudoajay","Hello Description app","AppKeywords" , "Welcome to site" , "have  purchase anything")
   END

   INSERT INTO AppInformationTable ( ID,AppTitle, AppDescription,AppKeywords,MainTitle,MainDescription)
  VALUES ( 1, "Sudoajay","Hello Description app","AppKeywords" , "Welcome to site" , "have  purchase anything") ON DUPLICATE KEY UPDATE    
AppTitle="helloassa", AppDescription ="hello descriptioasn"


USE fitness_plan_database; 
 
 CREATE TABLE ItemDetailTable (   
    ID integer PRIMARY KEY AUTO_INCREMENT,   
    ItemSlug TEXT NOT NULL,   
    ItemTitle TEXT NOT NULL,   
    ItemDescription TEXT NOT NULL,
     ItemAmount TEXT NOT NULL,   
    ItemPrice TEXT NOT NULL,   
      ItemMainImage TEXT NOT NULL,   
          ItemImages TEXT NOT NULL,   

    Created TIMESTAMP NOT NULL DEFAULT NOW()
       );  