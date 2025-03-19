let url = "http://universities.hipolabs.com/search?name=";

let btn = document.querySelector("#button");
let clearBtn = document.querySelector("#clear");

btn.addEventListener("click", async () => {
    let country = document.querySelector("input").value;
    console.log(country);
    let link = await getCollage(country);
    show(link);
});

clearBtn.addEventListener("click", () => {
    clearList();
});

function clearList() {
    let list = document.querySelector("#list");
    list.innerHTML = "";
}

function show(link) {
    clearList();
    
    if (link.length === 0) {
        let li = document.createElement("li");
        li.textContent = "No universities found. Please try a different search.";
        list.appendChild(li);
        return;
    }
    
    link.forEach(college => {
        let li = document.createElement("li");
        li.innerHTML = `
            <h3>${college.name}</h3>
            <p>Country: ${college.country}</p>
            <p>State/Province: ${college['state-province'] || 'N/A'}</p>
            <p>Web Pages: <a href="${college.web_pages[0]}" target="_blank">Visit Website</a></p>
        `;
        list.appendChild(li);
    });
}

async function getCollage(country) {
    try {
        let res = await axios.get(url + country);
        return res.data;
    } catch (err) {
        console.error("Error:", err);
        return [];
    }
} 