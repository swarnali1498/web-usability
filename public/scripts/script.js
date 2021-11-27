f1=0;
function proj1(){
    if(f1==0)
    {
        document.getElementById("proj1").style.display = "block";
        f1=1;
    }
    else
    {
        document.getElementById("proj1").style.display = "none";
        f1=0;
    }
}
f2=0;
function proj2(){
    if(f2==0)
    {
        document.getElementById("proj2").style.display = "block";
        f2=1;
    }
    else
    {
        document.getElementById("proj2").style.display = "none";
        f2=0;
    }
}
f3=0;
function proj3(){
    if(f3==0)
    {
        document.getElementById("proj3").style.display = "block";
        f3=1;
    }
    else
    {
        document.getElementById("proj3").style.display = "none";
        f3=0;
    }
}
f4=0;
function proj4(){
    if(f4==0)
    {
        document.getElementById("proj4").style.display = "block";
        f4=1;
    }
    else
    {
        document.getElementById("proj4").style.display = "none";
        f4=0;
    }
}
f5=0;
function proj5(){
    if(f5==0)
    {
        document.getElementById("proj5").style.display = "block";
        f5=1;
    }
    else
    {
        document.getElementById("proj5").style.display = "none";
        f5=0;
    }
}
flag1=0;
function extract1()
{
    if(flag1==0)
    {
        flag1=1;
        document.getElementById("p1").style.display = "block";
    }
    else
    {
        flag1=0;
        document.getElementById("p1").style.display = "none";
    }
    var x = new XMLHttpRequest();
    x.onreadystatechange = function () {
        if (x.readyState == 4 && x.status == 200)
        { 
            printdetails(this,"p1");
        }
    };
    x.open("GET", "https://dblp.org/pid/166/2399.xml", true);
    x.send();
}
flag2=0;
function extract2()
{
    if(flag2==0)
    {
        flag2=1;
        document.getElementById("p2").style.display = "block";
    }
    else
    {
        flag2=0;
        document.getElementById("p2").style.display = "none";
    }
    var x = new XMLHttpRequest();
    x.onreadystatechange = function () {
        if (x.readyState == 4 && x.status == 200)
        { 
            printdetails(this,"p2");
        }
    };
    x.open("GET", "https://dblp.org/pid/166/2375.xml", true);
    x.send();
}
flag3=0;
function extract3()
{
    if(flag3==0)
    {
        flag3=1;
        document.getElementById("p3").style.display = "block";
    }
    else
    {
        flag3=0;
        document.getElementById("p3").style.display = "none";
    }
    var x = new XMLHttpRequest();
    x.onreadystatechange = function () {
        if (x.readyState == 4 && x.status == 200)
        { 
            printdetails(this,"p3");
        }
    };
    x.open("GET", "https://dblp.org/pid/192/7511.xml", true);
    x.send();
}
flag4=0;
function extract4()
{
    if(flag4==0)
    {
        flag4=1;
        document.getElementById("p4").style.display = "block";
    }
    else
    {
        flag4=0;
        document.getElementById("p4").style.display = "none";
    }
    var x = new XMLHttpRequest();
    x.onreadystatechange = function () {
        if (x.readyState == 4 && x.status == 200)
        { 
            printdetails(this,"p4");
        }
    };
    x.open("GET", "https://dblp.org/pid/141/8540.xml", true);
    x.send();
}
flag5=0;
function extract5()
{
    if(flag5==0)
    {
        flag5=1;
        document.getElementById("p5").style.display = "block";
    }
    else
    {
        flag5=0;
        document.getElementById("p5").style.display = "none";
    }
    var x = new XMLHttpRequest();
    x.onreadystatechange = function () {
        if (x.readyState == 4 && x.status == 200)
        { 
            printdetails(this,"p5");
        }
    };
    x.open("GET", "https://dblp.org/pid/08/11295.xml", true);
    x.send();
}
function printdetails(x,tag)
{
        var xml = x.responseXML;
        op="";
        var ar=xml.getElementsByTagName("inproceedings");
        //console.log(ar.length);
        for(i=0;i<ar.length;i++)
        {
            op+="<li><a href=\"" + ar[i].getElementsByTagName("ee")[0].childNodes[0].nodeValue + "\"> " + 
            ar[i].getElementsByTagName("title")[0].childNodes[0].nodeValue + "<\/a> " +
            ar[i].getElementsByTagName("booktitle")[0].childNodes[0].nodeValue + " " +
            ar[i].getElementsByTagName("year")[0].childNodes[0].nodeValue + ": " +
            ar[i].getElementsByTagName("pages")[0].childNodes[0].nodeValue + "</li>";
        }
        document.getElementById(tag).innerHTML = op;
}

var facul=0;
function show_faculty()
{
    if(facul==0)
    {
        document.getElementById("Faculty").style.display = "block";
        facul=1;
    }
    else
    {
        document.getElementById("Faculty").style.display = "none";
        facul=0;
    }
}

var stud=0;
function show_student()
{
    if(stud==0)
    {
        document.getElementById("Student").style.display = "block";
        stud=1;
    }
    else
    {
        document.getElementById("Student").style.display = "none";
        stud=0;
    }
}

var alum=0;
function show_alumni()
{
    if(alum==0)
    {
        document.getElementById("Alumni").style.display = "block";
        alum=1;
    }
    else
    {
        document.getElementById("Alumni").style.display = "none";
        alum=0;
    }
}

a1=0;
a2=0;
a3=0;
a4=0;
a5=0;
a6=0;
a7=0;
function admin_mode()
{
    document.getElementById("edit_about_us").style.display="none";
    document.getElementById("edit_btn").style.display="block";
    if(a1==0)
    {
        document.getElementById("hide1").style.display = "block";
    }
    else
    {
        document.getElementById("show1").style.display = "block";
    }
    if(a2==0)
    {
        document.getElementById("hide2").style.display = "block";
    }
    else
    {
        document.getElementById("show2").style.display = "block";
    }
    if(a3==0)
    {
        document.getElementById("hide3").style.display = "block";
    }
    else
    {
        document.getElementById("show3").style.display = "block";
    }
    if(a4==0)
    {
        document.getElementById("hide4").style.display = "block";
    }
    else
    {
        document.getElementById("show4").style.display = "block";
    }
    if(a5==0)
    {
        document.getElementById("hide5").style.display = "block";
    }
    else
    {
        document.getElementById("show5").style.display = "block";
    }
    if(a6==0)
    {
        document.getElementById("hide6").style.display = "block";
    }
    else
    {
        document.getElementById("show6").style.display = "block";
    }
    if(a7==0)
    {
        document.getElementById("hide7").style.display = "block";
    }
    else
    {
        document.getElementById("show7").style.display = "block";
    }
    document.getElementById("admin").style.display = "none";
    document.getElementById("leave_admin").style.display = "block";
}

function leave_admin_mode()
{
    document.getElementById("hide1").style.display = "none";
    document.getElementById("hide2").style.display = "none";
    document.getElementById("hide3").style.display = "none";
    document.getElementById("hide4").style.display = "none";
    document.getElementById("hide5").style.display = "none";
    document.getElementById("hide6").style.display = "none";
    document.getElementById("hide7").style.display = "none";
    document.getElementById("admin").style.display = "block";
    document.getElementById("leave_admin").style.display = "none";
    document.getElementById("show1").style.display = "none";
    document.getElementById("show2").style.display = "none";
    document.getElementById("show3").style.display = "none";
    document.getElementById("show4").style.display = "none";
    document.getElementById("show5").style.display = "none";
    document.getElementById("show6").style.display = "none";
    document.getElementById("show7").style.display = "none";
    document.getElementById("edit_about_us").style.display="none";
    document.getElementById("edit_btn").style.display="none";
    document.getElementById("save_btn").style.display="none"; 
}

function fun() 
{  
    var a = prompt("Enter password for admin mode");  
    if (a == "1234") {  
        admin_mode();
    }  
    else {
        alert("Wrong password. Enter again!");
    }
}  

function hide_page1()
{
    a1=1;
    document.getElementById("show_about_us").style.display="none";
    document.getElementById("hide_about_us").style.display="block";
    document.getElementById("hide1").style.display="none";
    document.getElementById("show1").style.display="block";
    document.getElementById("edit_about_us").style.display="none";
    document.getElementById("edit_btn").style.display="none";
    document.getElementById("save_btn").style.display="none";
}

function hide_page2()
{
    a2=1;
    document.getElementById("show_focus_area").style.display="none";
    document.getElementById("hide_focus_area").style.display="block";
    document.getElementById("hide2").style.display="none";
    document.getElementById("show2").style.display="block";
}

function hide_page3()
{
    a3=1;
    document.getElementById("show_people").style.display="none";
    document.getElementById("hide_people").style.display="block";
    document.getElementById("hide3").style.display="none";
    document.getElementById("show3").style.display="block";
}

function hide_page4()
{
    a4=1;
    document.getElementById("show_resources").style.display="none";
    document.getElementById("hide_resources").style.display="block";
    document.getElementById("hide4").style.display="none";
    document.getElementById("show4").style.display="block";
}

function hide_page5()
{
    a5=1;
    document.getElementById("show_contact").style.display="none";
    document.getElementById("hide_contact").style.display="block";
    document.getElementById("hide5").style.display="none";
    document.getElementById("show5").style.display="block";
}

function hide_page6()
{
    a6=1;
    document.getElementById("show_publications").style.display="none";
    document.getElementById("hide_publications").style.display="block";
    document.getElementById("hide6").style.display="none";
    document.getElementById("show6").style.display="block";
}

function hide_page7()
{
    a7=1;
    document.getElementById("show_news").style.display="none";
    document.getElementById("hide_news").style.display="block";
    document.getElementById("hide7").style.display="none";
    document.getElementById("show7").style.display="block";
}

function show_page1()
{
    a1=0;
    document.getElementById("hide_about_us").style.display="none";
    document.getElementById("show_about_us").style.display="block";
    document.getElementById("show1").style.display="none";
    document.getElementById("hide1").style.display="block";
    document.getElementById("edit_btn").style.display="block";
    document.getElementById("save_btn").style.display="none";
}

function show_page2()
{
    a2=0;
    document.getElementById("hide_focus_area").style.display="none";
    document.getElementById("show_focus_area").style.display="block";
    document.getElementById("show2").style.display="none";
    document.getElementById("hide2").style.display="block";
}

function show_page3()
{
    a3=0;
    document.getElementById("hide_people").style.display="none";
    document.getElementById("show_people").style.display="block";
    document.getElementById("show3").style.display="none";
    document.getElementById("hide3").style.display="block";
}

function show_page4()
{
    a4=0;
    document.getElementById("hide_resources").style.display="none";
    document.getElementById("show_resources").style.display="block";
    document.getElementById("show4").style.display="none";
    document.getElementById("hide4").style.display="block";
}

function show_page5()
{
    a5=0;
    document.getElementById("hide_contact").style.display="none";
    document.getElementById("show_contact").style.display="block";
    document.getElementById("show5").style.display="none";
    document.getElementById("hide5").style.display="block";
}

function show_page6()
{
    a6=0;
    document.getElementById("hide_publications").style.display="none";
    document.getElementById("show_publications").style.display="block";
    document.getElementById("show6").style.display="none";
    document.getElementById("hide6").style.display="block";
}

function show_page7()
{
    a7=0;
    document.getElementById("hide_news").style.display="none";
    document.getElementById("show_news").style.display="block";
    document.getElementById("show7").style.display="none";
    document.getElementById("hide7").style.display="block";
}

function edit()
{
    document.getElementById("edit_about_us").value=document.getElementById("show_about_us").innerHTML;
    document.getElementById("show_about_us").style.display="none";
    document.getElementById("edit_about_us").style.display="block";
    document.getElementById("edit_btn").style.display="none";
    document.getElementById("save_btn").style.display="block";
}

function save()
{
    document.getElementById("show_about_us").innerHTML=document.getElementById("edit_about_us").value;
    if(a1==0)
    document.getElementById("show_about_us").style.display="block";
    document.getElementById("edit_about_us").style.display="none";
    document.getElementById("edit_btn").style.display="block";
    document.getElementById("save_btn").style.display="none";
}
