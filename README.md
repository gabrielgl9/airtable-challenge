# Airtable Challenge

## What I Liked
- It separates responsibilities between components  
- No extra libraries included  
- Has a zoom in and zoom out logic where the items adjust according to size and positioning  
- Dates can be changed and the system dynamically updates after submitting  
- Random colors between items  
- Month-oriented, making it easy to use  

## What I Would Change
- Make the days more visible in the table  
- Make zoom in and zoom out flexible, oriented by days, quarters, year, etc.  
- Missing drag in and drag out functionality (ran out of time)  
- Add more validations on submit  
- Make it responsive and improve accessibility  

## Design Decisions
I searched on Google for the current Airtable version and simplified it.  

## How I Would Test the Project
- Using the **React Testing Library**, test whether the popover opens after clicking on an item and if the form actually updates the item, changing its position in the table  
- Verify if clicking **Zoom In** and **Zoom Out** changes the positions of the items and, in the case of **Zoom In**, reduces the number of items
