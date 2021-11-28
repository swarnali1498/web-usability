var mouse_coords = [];

// localStorage.set()

let page_list = localStorage.getItem("page_list");
console.log(page_list);
if (page_list != "") {
    page_list = JSON.parse(page_list);
} else {
    page_list = {};
}

if (page_list[window.location.href] == undefined)
    page_list[window.location.href] = {};

if (page_list[window.location.href]["mouse_coords"] == undefined)
    page_list[window.location.href]["mouse_coords"] = [];

document.querySelector('body').onclick = function (ev) {
    let x = ev.layerX
    let y = ev.layerY
    page_list[window.location.href]["mouse_coords"].push(x, y);
    localStorage.setItem("page_list", JSON.stringify(page_list));
    console.log(x, y);
    console.log(page_list);
}

// try {
//     const form = new FormData();
//     let mouse_obj = {};
//     mouse_obj["URL"] = task_url;
//     mouse_obj["mouse_coords"] = mouse_coorinates;
//     form.append("start_time", start_time);
//     form.append("end_time", end_time);
//     form.append("mouse_coords", mouse_obj);
//     const responseObj = await postFormDataAsJson(url_post, form);
// } catch (error) {
//     console.error(error);
// }

