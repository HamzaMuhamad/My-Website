














// Show Details Button
let showDetailsBtn = document.querySelector("[data-show_details]");
let myInfo = document.querySelector("[data-my_section]")
let details = document.querySelector("[data-details]")

function myBoxatXss (element, size) {
    element.style.height = size
}


showDetailsBtn.addEventListener("click", function () {
    let smallMedia = window.matchMedia("(max-width: 525.008px)") 
    details.classList.toggle("active");
    if (details.classList.contains("active")) {
        myInfo.style.height = "624.25px"
        if (smallMedia.matches) {
            myBoxatXss(myInfo, "568.25px")
        }
        
    } else {
        myInfo.style.height = "212px"
        if (smallMedia.matches) {
            myBoxatXss(myInfo, "128px")
        }
    }
    
    
})





window.addEventListener("resize", () => {
    let media = window.matchMedia("(min-width: 1200px)");
    let smallMedia = window.matchMedia("(max-width: 525.008px)") 
    if (media.matches) {

        myInfo.style.height = "744px"
        myInfo.style.transitionDuration = "300ms";
        details.style.opacity = "1";
        
    } else {
        if (details.classList.contains("active")) {
            myInfo.style.height = "624.25px"

            if (smallMedia.matches) {
                myBoxatXss(myInfo, "568.25px")
            }
            
        } else {
            myInfo.style.height = "212px"
            if (smallMedia.matches) {
                myBoxatXss(myInfo, "128px")
            }
        }
        details.style.opacity = "1";
    }
})



// Switch the nav bar on

let sections = document.querySelectorAll("[data-content]");
let navItems = document.querySelectorAll("nav li");

function test (items, sectionName) {
    let arraySections = Array.from(sections)

    for (let i in arraySections) {
        arraySections[i].classList.remove("show")
        
        if (arraySections[i].id == sectionName +"-section") {
            arraySections[i].classList.add("show")
        }
        
    } 

    for (let item of items) {
        if (item.classList.contains("nav-active")) {
            item.classList.remove("nav-active")
        }
    }
        
}
for (let item of navItems) {
    item.addEventListener("click", (e) => {
        if (e.target.id == "about-nav") {
            test(navItems, "about")
            e.target.classList.add("nav-active")
        } else if (e.target.id == "portfolio-nav") {
            test(navItems, "portfolio")
            e.target.classList.add("nav-active")
        } else if (e.target.id == "contact-nav") {
            test(navItems, "contact")
            e.target.classList.add("nav-active")
        }
    })
}


// Custumizing Form

let allInputFields = document.querySelectorAll("[data-input]");
let formBtn = document.querySelector("[data-btn]");

let validation  = new Set();

function enableBtn () {
    formBtn.disabled = false
    formBtn.style.cursor = "pointer"
    formBtn.style.setProperty("--color-btn-before", "#ffffff91")
}
function disableBtn () {
    formBtn.disabled = true
    formBtn.style.cursor = "not-allowed"
    formBtn.style.setProperty("--color-btn-before", "gray")


}

function matches(element, event) {
    element.addEventListener(event, () => {


        if (element.value.length > 0) {
            // valid situation
            element.classList.add("outline-brand!")
            if (element.classList.contains("outline-red-500!")) {
                element.classList.remove("outline-red-500!")
            }
            validation.add(element.type)


        } else {
            if (element.classList.contains("outline-brand!")) {
                element.classList.remove("outline-brand!")
            }

            element.classList.add("outline-red-500!") 
            validation.delete(element.type)
        }

        if (element.type == "tel" && !isNaN(Number(element.value)) && element.value > 0) {
            // valid situation
            element.classList.add("outline-brand!")
            if (element.classList.contains("outline-red-500!")) {
                element.classList.remove("outline-red-500!")
            }
            validation.add(element.type)

        } else if (element.type == "tel" && isNaN(Number(element.value))){
            if (element.classList.contains("outline-brand"
            )) {
                element.classList.remove("outline-brand!")
            }
            element.classList.add("outline-red-500!") 
            validation.delete(element.type)
        }

        if (validation.size == 4) {
            enableBtn()
        } else {
            disableBtn()
        }
    })
}

// After refresh the site
let check = 0
allInputFields.forEach((v) => {
    if (v.value.length > 0) {
        check++
        if (validation.size < 4) {
            validation.add(v.type)
        }
    } 

    
    matches(v, "input")
    matches(v, "focus")


    v.addEventListener("blur", () => {
        if (v.classList.contains("outline-red-500!")) {
            v.classList.remove("outline-red-500!")
        } else if (v.classList.contains("outline-brand!")) {
            v.classList.remove("outline-brand!")
            
        }


    })

    
    if (check == 4) {
        enableBtn()
        
    } else {
        disableBtn()


    }
    
    

})

