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
