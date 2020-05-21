import React from "react";
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseAction';
import * as authorActions from '../../redux/actions/authorAction';
import propTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList.jsx';
import { Redirtect } from 'react-router-dom';
import Spinner from '../common/Spinner'
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
    state = {
        redirectToAddCoursePage: false
    };
    /* 
    nOW SEPARATING OUT THE LOGIN IN MODULE 10, creating separate pages for add and edit. This module was for 9th. Now commenting this until render function and adding it to new files 
    state = {
        course: {
            title: "",
        },
    };
    // This below approach is called as binding in the constructor
    // this.handleChange =  this.handleChange.bind(this);
 
// handleChange = event => {} 
// Arrow functions inherit binding context of their enclosing scope
 
handleChange = event =>  {
    const course = {...this.state.course.title, title: event.target.value };
    this.setState({ course: course });
}
handleSubmit = event => {
    event.preventDefault();
    this.props.actions.createCourse(this.state.course);
    // this.props.dispatch(courseActions.createCourse(this.state.course)); ------>>> To be used when mapDispatchToProps is not used in the Container component
} */
    navigateToCourse = () => {
        event.preventDefault();
        const { history } = this.props;
        history.push("/course");
    }
    componentDidMount() {
        const { courses, authors } = this.props; // In this way you can get rid of this.props.blah
        if (courses.length === 0)
            this.props.actions.loadCourses().catch(err => {
                alert("Loading the courses failed, please try after sometime" + err);
            });
        if (authors.length === 0)
            this.props.actions.loadAuthors().catch(err => {
                alert("Loading the authors failed, please try after sometime" + err);
            });
    }
    handleDelete = async (course) => {
        toast.success("Course Deleted");
        try {
            await this.props.actions.deleteCourse(course);
        }
        catch (error) {
            toast.error("Delete Failed" + error.message, { autoClose: false });
        }

    }
    render() {
        return (
            // <form onSubmit= {this.handleSubmit}>
            <>
                {this.state.redirectToAddCoursePage && <Redirtect to="/course" />}
                <h2> Courses </h2>
                {this.props.loading ? <Spinner /> : (
                    <>
                        <button
                            style={{ marginButton: 20 }}
                            className="btn btn-primary add-course"
                            onClick={() => this.navigateToCourse()}
                        >Add Course</button>
                        <CourseList courses={this.props.courses} onDeleteClick={this.handleDelete}></CourseList>
                    </>
                )}
                {/* <h3> Add Course </h3 > 
            <input 
            type = "text"
            onChange = { this.handleChange }
            value = { this.state.course.title }/> */}
                {/* This below will create another method in the render function */}
                {/* onChange = { this.handleChange.bind(this)} */}
                {/* 
            <input type = "submit"
            value = "Save" / > 
            {this.props.courses.map(course => (
                <div key={course.title}>{course.title}</div>
        ))}*/}
            </>
        );
    }
}
CoursesPage.propTypes = {
    authors: propTypes.array.isRequired,
    courses: propTypes.array.isRequired,
    actions: propTypes.object.isRequired,
    history: propTypes.object.isRequired,
    loading: propTypes.bool.isRequired
}
{/* dispatch: propTypes.func.isRequired */ }
{/* createCourse: propTypes.func.isRequired */ }
function mapStateToProps(state) {
    return {
        courses: state.authorReducer.length === 0 ? [] :
            state.courses.map(course => {
                return { ...course, authorName: state.authorReducer.find(a => a.id === course.authorId).name }
            }),
        authors: state.authorReducer,
        loading: state.apiCallStatusReducer > 0
    }
}//apiCallStatusReducer
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
            deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
        }
        // actions: bindActionCreators(courseActions, dispatch) ---.adding more actionCreators to dispatch. For eg:- adding authorAction now.actions: will be an object from the key
        //createCourse: course => dispatch(courseActions.createCourse(course))---> Used when bindActionCreators is not used and actions are dispatched
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);


{/* Four Ways to mapDispatchToProps:-

1. Using the dispatch function
2. Using the mapDispatchToProps function and return the function that dispatched the actions.
3. Using the bindActionCreators that mimicks the entire action functions and then dispatches it.
4. Instead of using the mapDispatchToProps as a function, using it as an object
 */}