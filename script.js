
console.log("Javascript Online");


document.getElementById("parameterDiv").style.display = "none";
document.getElementById("paramsDiv").style.display = "none";

let jsonRadio = document.getElementById("json");
let otherParametersRadio = document.getElementById("otherparameter");

jsonRadio.addEventListener("click", () => {
    document.getElementById("parameterDiv").style.display = "none";
    document.getElementById("paramsDiv").style.display = "none";
    document.getElementById("jsonDiv").style.display = "flex";
})
otherParametersRadio.addEventListener("click", () => {
    document.getElementById("parameterDiv").style.display = "flex";
    document.getElementById("paramsDiv").style.display = "block";
    document.getElementById("jsonDiv").style.display = "none";
})


let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", addParameter);

let inde = 1;
function addParameter(e) {
    // console.log("adding");


    let parameterDiv = document.getElementById("parameterDiv");
    let string = `
    <div class="col-md-4">
    <label>Parameter ${inde + 1}</label>
</div>
<div class="col-md-3">
    <input type="text" class="form-control key" placeholder="Enter the Key" id="keyparameter${inde + 1}">
</div>
<div class="col-md-3">
    <input type="text" class="form-control value" placeholder="Enter the Value" id="valueparameter${inde + 1}">
</div>
<div class="col-md-2">
    <button class="btn btn-primary deleteParam">
        -
    </button>
</div>
    `

    let newElement = convertIntoELement(string);
    // console.log(newElement);
    inde++;
    let paramsDiv = document.getElementById("paramsDiv")
    paramsDiv.appendChild(newElement);


    let deleteParam = document.getElementsByClassName("deleteParam");
    for (item of deleteParam) {
        item.addEventListener("click", (e) => {
            console.log("deleting");
            e.target.parentElement.parentElement.remove();

        })
    }

}

function convertIntoELement(string) {
    let div = document.createElement("div");
    div.className = "form-group row"
    div.innerHTML = string;
    return div;
}

function getRequest() {
    let url = document.getElementById("inputurl").value;
    let requestType = document.querySelector("input[name='radios']:checked").value;
    let contentType = document.querySelector("input[name='type']:checked").value;
    let responseArea = document.getElementById("responseText");
    let requestJson = document.getElementById("jsonBody").value;
    console.log('url is ', url);
    console.log('Request Type is ', requestType);
    console.log('Content type is ', contentType);
    let data = {};
    if (contentType == "json") {
        data = requestJson;
    }
    else {
        for (i = 0; i < inde + 1; i++) {
            if (document.getElementById('keyparameter' + (i + 1)) != undefined) {
                key = document.getElementById('keyparameter' + (i + 1));
                value = document.getElementById('valueparameter' + (i + 1));
                console.log(key.value, value.value);
                data[key.value] = value.value
            }
        }
        
        data = JSON.stringify(data);
    }
    console.log('data is ', data);

    // console.log(data);


    responseArea.innerHTML = "Fetching the data. Please wait..."
    if (requestType == "get") {
        fetch(url, { method: 'GET' }).then(response => response.text()).then(data => document.getElementById("responseText").innerHTML = data)
    }
    else {
        console.log('url is', url);
        console.log('data is', data);
        
        
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              },
        })
            .then((response) => response.json())
            .then((data) => {
                document.getElementById("responseText").innerHTML = JSON.stringify(data);
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}




let submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", getRequest);


