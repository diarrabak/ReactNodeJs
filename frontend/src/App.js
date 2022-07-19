import "./App.css";
import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/template/header";
import Footer from "./components/template/footer";
import Home from "./components/template/home";
import Error from "./components/template/error";
import Contact from "./components/template/contact";
import Research from "./components/template/research";
import GroupList from "./components/groups/groupList";
import CreateGroup from "./components/groups/createGroup";
import UpdateGroup from "./components/groups/updateGroup";
import ShowGroup from "./components/groups/showGroup";
import CreateResearcher from "./components/researchers/createResearcher";
import ResearcherList from "./components/researchers/researcherList";
import ShowResearcher from "./components/researchers/showResearcher";
import UpdateResearcher from "./components/researchers/updateResearcher";
import CreateArticle from "./components/articles/createArticle";
import ShowArticle from "./components/articles/showArticle";
import ArticleList from  "./components/articles/articleList";
import UpdateArticle from "./components/articles/updateArticle";
import CreateNews from "./components/news/createNews";
import UpdateNews from "./components/news/updateNews";
import ShowNews from "./components/news/showNews";
import NewsList from "./components/news/newsList";
import EventList from "./components/events/eventList";
import CreateEvent from "./components/events/createEvent";
import UpdateEvent from "./components/events/updateEvent";
import ShowEvent from "./components/events/showEvent";
import CreateJob from "./components/careers/createJob";
import JobList from "./components/careers/jobList";
import UpdateJob from "./components/careers/updateJob";
import ShowJob from "./components/careers/showJob";
import Studies from "./components/template/studies";
function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/home">
          <Home />
        </Route>

        <Route path="/contact">
          <Contact />
        </Route>

        <Route path="/research">
          <Research />
        </Route>

       <Route path="/researchers">
          <ResearcherList />
        </Route>

         <Route path="/researcher/:id">
          <UpdateResearcher />
        </Route>

        <Route path="/showResearcher/:id">
          <ShowResearcher />
        </Route> 


        <Route path="/addResearcher">
          <CreateResearcher />
        </Route> 


        <Route path="/events">
          <EventList />
        </Route>

         <Route path="/event/:id">
          <UpdateEvent />
        </Route>

        <Route path="/showEvent/:id">
          <ShowEvent />
        </Route> 


        <Route path="/addEvent">
          <CreateEvent />
        </Route> 

        <Route path="/groups">
          <GroupList />
        </Route>

        <Route path="/addGroup">
          <CreateGroup />
        </Route>

        <Route path="/group/:id">
          <UpdateGroup />
        </Route>

        <Route path="/showGroup/:id">
          <ShowGroup />
        </Route>

        <Route path="/addArticle">
          <CreateArticle />
        </Route>

        <Route path="/articles">
          <ArticleList />
        </Route>

        <Route path="/article/:id">
          <UpdateArticle />
        </Route>

        <Route path="/showArticle/:id">
          <ShowArticle />
        </Route>


        <Route path="/addNews">
          <CreateNews />
        </Route>

        <Route path="/news">
          <NewsList />
        </Route>

        <Route path="/new/:id">
          <UpdateNews />
        </Route>

        <Route path="/showNews/:id">
          <ShowNews />
        </Route>

        <Route path="/doctorate">
          <Contact />
        </Route>
        <Route path="/masters">
          <Contact />
        </Route>
        <Route path="/addJob">
          <CreateJob />
        </Route>

        <Route path="/showJob/:id">
          <ShowJob />
        </Route>

        <Route path="/job/:id">
          <UpdateJob />
        </Route>

        <Route path="/careers">
          <JobList />
        </Route>

        <Route path="/studies">
          <Studies />
        </Route>

        {/* <Route path="/phd-positions">
          <Contact />
        </Route>
        <Route path="/postdocs">
          <Contact />
        </Route>
       
        <Route path="/other-positions">
          <Contact />
        </Route> */}

        <Route path="*">
          <Error />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
