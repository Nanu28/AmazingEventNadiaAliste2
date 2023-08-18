const tableContainerEventStatistics = document.getElementById("tableContainerEventStatistics");
 const tableContainerPastEventStatistics = document.getElementById("tableContainerPastEventStatistics");
 const tableContainerUpcomingEventStatistics = document.getElementById("tableContainerUpcommingEventstatistics");

 const currentDate = "2023-03-10"; 
 const url = "https://mindhub-xj03.onrender.com/api/amazing";

 fetch(url)
   .then(response => response.json())
   .then(data => {
     const events = data.events;

   
     const eventsByAssistance = events.sort((a, b) => {
       const percentageA = (a.assistance / a.capacity) * 100;
       const percentageB = (b.assistance / b.capacity) * 100;
       return percentageB - percentageA;
     });

     
     const highestAssistanceEvents = eventsByAssistance.slice(0, 3);

   
     const highestAssistanceTable = tableContainerEventStatistics.querySelector("table");
     const highestAssistanceRows = highestAssistanceTable.querySelectorAll("tr");
     highestAssistanceRows[2].innerHTML = `
       <td>${highestAssistanceEvents[0].name} (${(highestAssistanceEvents[0].assistance / highestAssistanceEvents[0].capacity * 100).toFixed(2)}%)</td>
       <td>${highestAssistanceEvents[1].name} (${(highestAssistanceEvents[1].assistance / highestAssistanceEvents[1].capacity * 100).toFixed(2)}%)</td>
       <td>${highestAssistanceEvents[2].name} (${(highestAssistanceEvents[2].assistance / highestAssistanceEvents[2].capacity * 100).toFixed(2)}%)</td>
     `;


     const pastEvents = events.filter(event => event.date < currentDate);

     const categoryDataPast = {};


     pastEvents.forEach(event => {
       const category = event.category;
       const price = event.price || 0;

       if (!categoryDataPast[category]) {
         categoryDataPast[category] = {
           totalRevenue: 0,
           totalAssistance: 0,
           eventCount: 0,
         };
       }
       categoryDataPast[category].totalRevenue += price * event.assistance;
       categoryDataPast[category].totalAssistance += event.assistance;
       categoryDataPast[category].eventCount++;
     });


     const pastEventTable = tableContainerPastEventStatistics.querySelector("table tbody");

     for (const category in categoryDataPast) {
       if (categoryDataPast.hasOwnProperty(category)) {
         const { totalRevenue, totalAssistance, eventCount } = categoryDataPast[category];
         const totalCapacity = eventCount * 1000; 
         const percentageAssistance = ((totalAssistance / totalCapacity) * 100).toFixed(2);

         const newRow = document.createElement("tr");
         newRow.innerHTML = `
           <td>${category}</td>
           <td>$${totalRevenue.toLocaleString()}</td>
           <td>${percentageAssistance}%</td>
         `;
         pastEventTable.appendChild(newRow);
       }
     }

 
     const upcomingEvents = events.filter(event => event.date > currentDate);


     const categoryDataUpcoming = {};


     upcomingEvents.forEach(event => {
       const category = event.category;
       const price = event.price || 0;
       const estimate = event.estimate || 0;

       if (!categoryDataUpcoming[category]) {
         categoryDataUpcoming[category] = {
           totalRevenue: 0,
           totalAssistance: 0,
           eventCount: 0,
         };
       }

       categoryDataUpcoming[category].totalRevenue += price * estimate;
       categoryDataUpcoming[category].totalAssistance += estimate;
       categoryDataUpcoming[category].eventCount++;
     });

     

     const upcomingEventTable = tableContainerUpcomingEventStatistics.querySelector("table tbody");

     for (const category in categoryDataUpcoming) {
       if (categoryDataUpcoming.hasOwnProperty(category)) {
         const data = categoryDataUpcoming[category];
         const { totalRevenue, totalAssistance, eventCount } = data;
         const totalCapacity = eventCount * 1000; 
         const percentageAssistance = ((totalAssistance / totalCapacity) * 100).toFixed(2);

         const newRow = document.createElement("tr");
         newRow.innerHTML = `
           <td>${category}</td>
           <td>$${totalRevenue.toLocaleString()}</td>
           <td>${percentageAssistance}%</td>
         `;
         upcomingEventTable.appendChild(newRow);
       }
     }
   })
   .catch(error => console.log(error));




