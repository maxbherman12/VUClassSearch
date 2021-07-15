import React from 'react'
import './enroll.styles.css'

import EnrollForm from '../../components/enroll-form/enroll-form.component';

const EnrollPage = ({userId}) => (
    <div className="enroll-page">
        <EnrollForm />
    </div>
)

export default EnrollPage;