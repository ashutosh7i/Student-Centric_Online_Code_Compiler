[![wakatime](https://wakatime.com/badge/github/ashutosh7i/Student-Centric_Online_Code_Compiler.svg)](https://wakatime.com/@Ashutosh7i/projects/frclgtzjob) &nbsp;&nbsp;&nbsp;&nbsp;
[![Azure Static Web Apps CI/CD](https://github.com/ashutosh7i/Student-Centric_Online_Code_Compiler/actions/workflows/azure-static-web-apps-thankful-stone-0e50d4900.yml/badge.svg?branch=main)](https://github.com/ashutosh7i/Student-Centric_Online_Code_Compiler/actions/workflows/azure-static-web-apps-thankful-stone-0e50d4900.yml)
# Student-Centric Online Code Compiler

(College Minor Project)

**Idea**: This project aims to create a centralized online coding platform tailored for educational institutions. It addresses the challenges of diverse compiler setups, slow performance, and data loss in college labs. Our goal is to simplify coding tasks for both students and educators

**Technologies**:

- **Frontend**: HTML, CSS, JavaScript, React, ChakraUI.
- **Backend**: Node.js, Express.
- **Compilation**: WASM (browser based compiling).
- **Databases**: MySQL (user & code management).
- **Hosting**: NGINX & Local network for college-wide access.
- **Authentication**: Google OAuth2.

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
- Strong Assessments: Offline test hosting.

# Execution:

- System Desing : [link](https://excalidraw.com/#json=qb0DsEQw1FVSlGJ51Fcbd,_H-iYM9UnH1Y9iJNsqSdsA)

- UI Desing : [link](https://www.figma.com/file/v9nur0uziSTKFoJjB8nrKN/Untitled?type=design&node-id=0%3A1&mode=design&t=S5AMo840ItijwGYc-1)

* HomePage : [@Adityapaliwal1](https://github.com/adityapaliwal1)

* Azure Deployment : [soc.ashutosh7i.dev](https://soc.ashutosh7i.dev)

* Progress tracking: [wakatime](https://wakatime.com/@Ashutosh7i/projects/frclgtzjob)

* Special Error : In github actions, You may have seen that there are around 20 commits around github action & Azure, this is because of a error, that was failing the build during workflow run, i thought it is a special mention, the error was due to case sensitivity, english can be uppercase and lowercase, so can be the names of a file, Error happens when Git fails to track this case sensitivity, Actually it is not a issue with git but with operating systems, i either dont know much about this error, more info in the solutions below-
  The issue is on deployment build was failing with error "Module xyz not found at app.js" but actually it was present there, so git was causing issue here, which was fixed and at last build passed successfully.

  here are links to solution- <br>
  https://stackoverflow.com/a/55541435/3051080
  https://stackoverflow.com/questions/62378045/

* Compilation server Deployment: successfully deployed compilation api on azure using docker✅.
