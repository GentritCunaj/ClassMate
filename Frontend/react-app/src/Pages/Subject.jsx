import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './common/header/Header';
import Footer from './common/footer/Footer';
import Assignments from './Assignments';
import Resources from './Resources';
import Quizs from './Quizs';

function Subject() {
    const { subjectId } = useParams(); // Merr ID-në e subjektit nga React Router
    return (
        <>
            <Header prop={true} />
            {/* Kalon ID-në e subjektit te komponenti Assignments */}
            <Assignments subjectId={subjectId} />
            <Resources subjectId={subjectId} />
            
            <Quizs subjectId={subjectId} />
            <Footer />
        </>
    );
}

export default Subject;
