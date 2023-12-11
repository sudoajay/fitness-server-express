-- CREATE DATABASE fitness_plan_database; 
-- USE fitness_plan_database; 
 
 CREATE TABLE PaymentFormTable (   
    ID integer PRIMARY KEY AUTO_INCREMENT,   
    FullName TEXT NOT NULL,   
    Age TEXT NOT NULL,   
    Email TEXT NOT NULL,
     PhoneNumber TEXT NOT NULL,   
    Information LONGTEXT NOT NULL,   
     Product LONGTEXT NOT NULL,   
    Amount TEXT NOT NULL,   
    PromoCode TEXT NOT NULL,
     ReferralCode TEXT NOT NULL ,
     Created TIMESTAMP NOT NULL DEFAULT NOW()
    );  

   INSERT INTO PaymentFormTable (FullName, Age,Email,PhoneNumber,Information,Product,Amount,PromoCode,Referralcode)
  VALUES ("vijay","85","sudovijay@gmail.com","9568asd65","india","Itemsasd","4500","VJA50","VJA50")


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
     Product LONGTEXT NOT NULL,   
    Amount TEXT NOT NULL,   
    PromoCode TEXT NOT NULL,
     ReferralCode TEXT NOT NULL ,
     PaymentMethod TEXT NOT NULL ,
      PaymentID TEXT NOT NULL ,
      OrderID TEXT NOT NULL ,
   AccessToken TEXT NOT NULL ,
    Created TIMESTAMP NOT NULL DEFAULT NOW()
       );  
 INSERT INTO PaymentTable (FullName, Age,Email,PhoneNumber,Information,Product,Amount,PromoCode,ReferralCode,PaymentMethod,PaymentID,OrderID,AccessToken)
  VALUES ("vijay","02","sudovijay@gmail.com","956865","india","Items","45","AJA50","AJA50","Papal","asdas","asda","asdasa")



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
    AppIcon Text NOT NULL,
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

INSERT INTO ItemDetailTable (ID,ItemSlug, ItemTitle,ItemDescription,ItemAmount,ItemPrice,ItemMainImage,ItemImages)
  VALUES (2,"ajayasdasda","Tricep","hello man the asdas coem hereq" , "90" , "1000","mainImage.webp", "1.webp - 34.13 KB),(2.webp - 500.81 KB),(3.webp - 42.59 KB),(4.webp - 39.68 KB),(5.webp - 191.79 KB)");

       USE fitness_plan_database; 
 
 CREATE TABLE LoginDetailTable (   
    ID integer PRIMARY KEY AUTO_INCREMENT,   
    UserName TEXT NOT NULL,   
    PassWord TEXT NOT NULL,   
    Role TEXT NOT NULL,   
    Status boolean NOT NULL,   
    PromoCode TEXT NOT NULL,   
    PercentOff TEXT NOT NULL,   
    Name TEXT NOT NULL,   
    Country TEXT NOT NULL,   
    Email TEXT NOT NULL,  
    Image Text Not null, 
    Phone TEXT NOT NULL,   
    Gender TEXT NOT NULL,   
    Created TIMESTAMP NOT NULL DEFAULT NOW()
       );  


        INSERT INTO LoginDetailTable (UserName, PassWord,Role,Status,PromoCode,PercentOff,Name,Country,Email,Image,Phone,Gender)
  VALUES ("Saurav","123","Admin",1,"AJA50","50","Saurav Singh","India","sudoajay@gmail.com","","9568855513", "M");



 CREATE TABLE FAQDetailTable (   
    ID integer PRIMARY KEY AUTO_INCREMENT,   
    Question TEXT NOT NULL,   
    Answer TEXT NOT NULL,    
    Created TIMESTAMP NOT NULL DEFAULT NOW()
       );  

       INSERT INTO FAQDetailTable (Question, Answer)
  VALUES ("How long are the workout sessions for each plan?","The workout sessions for each plan typically range from 45 minutes to an hour. It is recommended to allocate an additional 10 minutes for a warm-up before starting the workout.");

         INSERT INTO FAQDetailTable (Question, Answer)
  VALUES ("What fitness level do I need to be at to start these workout plans?","These workout plans are specifically designed for beginners who are just starting their fitness journey. They are suitable for individuals who have never been to the gym before or those who are new to exercise.");