1."npm install; npm run dev" to run the project

2.The features included the auto complete of input text field and for users to select location.
The location can't be selected if its not choosed from auto completeion list, which make sure users
always choose the valid location.

Also the map could add markers everytime you choose a location, and it will located to last location you select 
everytime

address list is the record of the address you have selected, it could be deleted in groups(use checkbox as you requested),
and also have pagination feature.

There is also a button to relocated the position, and also the last searched time zone will be shown

3.The projects using vuex, because its needed for multiple components(Map, AddressList, timeZone), and some times if 
the api call is only used inside one component so we choose not to use it in vuex, just use it inside that component.

4.The project is designed to be very interctaive with users, every time you insert, delete, there is a loading status showing
and all the buttons will be locked for preventing people messing up the webapp.

5.I didnt push my .env code in my github, you need to create a file called .env and copy paste following:
VITE_GOOGLE_PLACE_API_KEY = AIzaSyA5rwwmFLIq1I4hBhZJ1pJ0v45hoPV86EM 
VITE_GOOGLE_MAP_API_KEY = AIzaSyDui7WUBM1z-fG1zRfdqrgTKhhNjPPnHJg
VITE_GOOGLE_API_URL = https://maps.googleapis.com/maps/api/js
VITE_GOOGLE_TIMEZONE_API_URL = https://maps.googleapis.com/maps/api/timezone/json


ps: I dedicate too much time on this take home challenge, I am so appreciated if I can get at least one interview next,
Thank you,
Dennis
 
