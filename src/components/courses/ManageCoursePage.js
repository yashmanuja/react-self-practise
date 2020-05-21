import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from '../../redux/actions/courseAction';
import { loadAuthors } from '../../redux/actions/authorAction';
import propTypes from 'prop-types';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';
/**
 * 
 * 
 */
function ManageCoursePage({ courses, authors, loadCourses, loadAuthors, saveCourse, history, ...props }) {
    /* console.log({...props.course}); */
    const [course, setCourse] = useState({ ...props.course });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    /*     setCourse({...course, id: "1"});
        console.log(course); */
    useEffect(() => {
        if (courses.length === 0)
            loadCourses().catch(err => {
                alert("Loading the courses failed, please try after sometime" + err);
            });
        else {
            console.log(props.course);
            setCourse({ ...props.course });
        }
        if (authors.length === 0)
            loadAuthors().catch(err => {
                alert("Loading the authors failed, please try after sometime" + err);
            });
    }, [props.course]); //pass an empty array in order to run the code just one when the componentDidMount, useEffect hook works the same way as componentDidMount in class component.
    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(value);
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === "authorId" ? parseInt(value, 10) : value
        }))
        console.log(course);
    }

    function formIsValid() {
        const { title, authorId, category} = course;
        const errors = {};
        if (!title) errors.title = "Title is required.";
        if (!authorId) errors.author = "Author is required.";
        if (!category) errors.category = "Category is required.";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }
    const handleSave = (event) => {        
        event.preventDefault();
        if(!formIsValid()) return;
        setSaving(true);
        saveCourse(course).then(() => {
            toast.success('Course Saved'); 
            history.push("/courses");
        }).catch( err => {
            setSaving(false);
            setErrors({ onSave: err.message });
        });
    }
    return (
        authors.length === 0 || courses.length === 0? (<Spinner/>) :(
        <CourseForm
            course={course}
            errors={errors}
            authors={authors}
            onChange={handleChange}
            onSave={handleSave}
            saving= {saving}
        />
        ) 
    )
}

ManageCoursePage.propTypes = {
    course: propTypes.object,
    authors: propTypes.array.isRequired,
    courses: propTypes.array.isRequired,
    loadAuthors: propTypes.func.isRequired,
    loadCourses: propTypes.func.isRequired,
    saveCourse: propTypes.func.isRequired,
    history: propTypes.object.isRequired
}
export function getCourseBySlug(courses, slug) {
    return courses.find(course => course.slug === slug) || null;
}
function mapStateToProps(state, ownProps) {
    const slug = ownProps.match.params.slug;
    const course = slug ? getCourseBySlug(state.courses, slug) : newCourse;
    return {
        courses: state.courses,
        authors: state.authorReducer,
        course
    }
}
//Declaring mapDispatchToProps as an object
// Could have been below like this loadCourses: loadCourses, but since I am importing named import I can make it shorthand by removing rhs declaration (JS object shorthand syntax)
const mapDispatchToProps = {
    loadCourses,
    loadAuthors,
    saveCourse
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);