window.addEventListener("load", function () {
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
      response.json().then(function (json) {
         const destination = document.getElementById("missionTarget");
         destination.innerHTML =
            `
   <h2>Mission Destination</h2>
      <ol>
        <li>Name: ${json[0].name}</li>
        <li>Diameter: ${json[0].diameter}</li>
        <li>Star: ${json[0].star}</li>
        <li>Distance from Earth: ${json[0].distance}</li>
        <li>Number of Moons: ${json[0].moons}</li>
      </ol>
         <img src="${json[0].image}">
      `;
      })
   });

   let form = document.querySelector("form");
   let launchStatus = document.getElementById("launchStatus");
   let faultyItems = document.getElementById("faultyItems");
 
   form.addEventListener("submit", function (event) {
      let pilotName = document.querySelector("input[name=pilotName]");
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");

      if (pilotName.value === "" || copilotName.value === "" ||
         fuelLevel.value === "" || cargoMass.value === "") {
         alert("All fields are required!");
         event.preventDefault();
      } else if (isNaN(pilotName.value) === false ||
         isNaN(copilotName.value) === false) {
         alert("Make sure to enter valid information for each field!")
         event.preventDefault();
      } else if (isNaN(fuelLevel.value) === true || isNaN(cargoMass.value) === true) {
         alert("Make sure to enter valid information for each field!")
         event.preventDefault();
      }
      if (fuelLevel.value < 10000) {
         launchStatus.style.color = "red";
         launchStatus.innerHTML = "Shuttle not ready for launch"
         faultyItems.style.visibility = "visible";
         faultyItems.innerHTML = `
            <ol>
              <li>${pilotName.value} is ready for launch.</li>
              <li>${copilotName.value} is ready for launch.</li>
              <li>Fuel is too low for launch.</li>
              <li>Cargo mass low enough for launch.</li>
            </ol>
            `;
         event.preventDefault();
      }
      if (cargoMass.value > 10000) {
         launchStatus.style.color = "red";
         launchStatus.innerHTML = "Shuttle not ready for launch"
         faultyItems.style.visibility = "visible";
         faultyItems.innerHTML = `
            <ol>
              <li>${pilotName.value} is ready for launch.</li>
              <li>${copilotName.value} is ready for launch.</li>
              <li>Fuel level high enough for launch.</li>
              <li>Cargo mass is too high enough for launch.</li>
            </ol>
            `;
         event.preventDefault();
      }
      if (fuelLevel.value < 10000 && cargoMass.value > 10000) {
         launchStatus.style.color = "red";
         launchStatus.innerHTML = "Shuttle not ready for launch"
         faultyItems.style.visibility = "visible";
         faultyItems.innerHTML = `
            <ol>
              <li>${pilotName.value} is ready for launch.</li>
              <li>${copilotName.value} is ready for launch.</li>
              <li>Fuel level is too low for launch.</li>
              <li>Cargo mass is too high enough for launch.</li>
            </ol>
            `;
         event.preventDefault();
      }
      if (fuelLevel.value > 10000 && cargoMass.value < 10000) {
         launchStatus.style.visibility = "visible";
         faultyItems.style.visibility = "visible";
         launchStatus.style.color = "green";
         launchStatus.innerHTML = "Shuttle is ready for launch";
         faultyItems.innerHTML = `
            <ol>
               <li>${pilotName.value} is ready for launch.</li>
               <li>${copilotName.value} is ready for launch.</li>
               <li>Fuel level high enough to begin launch</li>
               <li>Cargo mass low enough for launch.</li>
            </ol>
             `;
      }
      event.preventDefault();
   });
});
