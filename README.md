[![wakatime](https://wakatime.com/badge/github/ashutosh7i/Student-Centric_Online_Code_Compiler.svg)](https://wakatime.com/@Ashutosh7i/projects/frclgtzjob) &nbsp;&nbsp;&nbsp;&nbsp;
# Student-Centric Online Code Compiler

(College Minor Project)

**Idea**: This project aims to create a centralized online coding platform tailored for educational institutions. It addresses the challenges of diverse compiler setups, slow performance, and data loss in college labs. Our goal is to simplify coding tasks for both students and educators

**Technologies**:

- **Frontend**: React, Recoil, React-routerV6 ChakraUI.
- **Backend**: Node.js, Express, Redis, Docker.
- **Compilation**: Native Compiler for various programming languages.
- **Databases**: Postgres for user and code management.
- **Hosting**: NGINX & Local network for college-wide access.
- **Authentication**: Auth0 and Google Workspace Login.

**Planned Applications**:

1. **Educational Institutions**:
   - Streamlined coding environment for students and teachers.
2. **Hackathons and Competitions**:
   - Consistent coding environments for competitions.
3. **Corporate Training**:
   - Coding platform for employee training.
4. **Open Source Projects**:
   - Collaborative coding environment for open-source communities.

**Features**:

- Centralized Platform: Local Network Hosted (offline available).
- Multi-Language Support: Access to various programming languages.
- Real-Time Code Saving: Seamless continuation across labs.
- Interactive Console: Effortless input and output.
- Monitoring System: Educators can track and guide.
- Strong Assessments: Offline test hosting (feature plans).

# Execution:

- System Desing : [link](https://excalidraw.com/#json=qb0DsEQw1FVSlGJ51Fcbd,_H-iYM9UnH1Y9iJNsqSdsA)

- UI Desing : [link](https://www.figma.com/file/v9nur0uziSTKFoJjB8nrKN/Untitled?type=design&node-id=0%3A1&mode=design&t=S5AMo840ItijwGYc-1)

* Azure Deployment : [soc.ashutosh7i.dev](https://soc.ashutosh7i.dev)

* Progress tracking: [wakatime](https://wakatime.com/@Ashutosh7i/projects/frclgtzjob)

* Special Error : In github actions, You may have seen that there are around 20 commits around github action & Azure, this is because of a error, that was failing the build during workflow run, i thought it is a special mention, the error was due to case sensitivity, english can be uppercase and lowercase, so can be the names of a file, Error happens when Git fails to track this case sensitivity, Actually it is not a issue with git but with operating systems, i either dont know much about this error, more info in the solutions below-
  The issue is on deployment build was failing with error "Module xyz not found at app.js" but actually it was present there, so git was causing issue here, which was fixed and at last build passed successfully.

  here are links to solution- <br>
  https://stackoverflow.com/a/55541435/3051080
  https://stackoverflow.com/questions/62378045/

* Compilation server Deployment: successfully deployed compilation api on azure using docker✅.
* v1.0.0 marked complete on 08/03/2024.

# Installation:
1. Install the required:
   - The project runs best on a Linux vm (Debian based systems eg ubuntu.).
   - Install Nginx, Nodejs, Docker, nohup, PM2(optionally).
2. Clone the project in the ```/home``` directory else change ```start.sh``` manually.
3. Copy the contents of ```nginx.conf``` into ```/etc/nginx/site-enabled/default``` directory.
   - also at this point you can install ssl certificate or type ```listen 80;``` below ``` #ssl config```
4. Rename env files in frontend and backend folders from ```.env.example``` to ```.env```.
5. cd into repository and make ```start.sh``` executable.
   - ```chmod +rwx start.sh```
6. Finally start the script
   - ```sudo su```
   - ```./start.sh```
7. SOC should be up and Running🚀
   - for any issues contact me on my socials from github profile.

# Contribution:
SOC is open for contributions whether you have a bugfix or a major PR i'll be happy to have any, feel free to create issue and we can discuss updates.
