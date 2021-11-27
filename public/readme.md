
IMPORTANT: Password for admin mode is 1234


The redesigned SERC website has scrollable navigation (when clicked on a particular tab, the corresponding page is shown) and has 9 tabs in the navigation bar -

1. SERC tab points to the home page (first page) of the website.

2. About Us contains content about the SERC website.

3. Focus Area lists the various research areas.

4. People tab contains 3 more subdivisions - Faculty, Student and Alumni. When clicked on each of them, respective profiles are shown and when clicked again, the content minimizes.

5. Resouces tab contains projects and courses offered by IIIT Hyderabad. On clicking a project, details of the project are shown and on clicking it again, the details disappear. A table depicting all courses offered by IIIT Hyderabad is shown next.

6. Contact Us tab contains postal address of IIIT Hyderabad and a form to give feedback. It is implemented using submit button (only frontend).

7. Publications tab contains publications under IIIT Hyderabad faculty. Publications of 5 faculty are fetched from DBLP website (xml) and details of them (title,booktitle,year,pages) are shown. The publications are fetched in descending order of year, that is, from latest year to previous years. When clicked on the title, the actual publication link opens.

8. News/Updates tab contains some news from IIIT Hyderabad main website with the corresponding links to their newspaper articles. Twitter and linkedin handles are added using font awesome icons and links to the respective handles.

9. Admin mode is implemented in the following way - 
    On clicking the button "Admin mode" in navbar, a prompt box is displayed asking for password for admin verification. Password for admin is 1234. If user enters correct password, the admin mode is enabled and the button changes to leave admin mode, else it shows error message. Inside admin mode, two types of operations are possible - 
        
        a) Admin can hide pages by clicking on the button on right side of page named "hide page" and similarly unhide them using "show page". After hiding page, page shows a message like "This page cannot be displayed". These buttons are only available in admin mode.
        
        b) Admin can make changes to text in the page. This operation is implemented only in the "About Us" page for now. Therefore, this page contains an additional button named "Edit page" on left side of page, clicking on which will transform the content of page in a textarea and we can modify the contents in it. After modifying contents, we click "Save page" which appears in place of "Edit page". After clicking "Save page", contents are saved. Thus, admin can modify contents in this way.
    
    After making changes, when we leave admin mode, all those "edit/hide/save/show" buttons disappear, but the modified contents remain.

    