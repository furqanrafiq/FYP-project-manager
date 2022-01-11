import React from 'react'
import { Card, Col, Row } from 'antd'

const AdminDashboardHome = () => {
    return (
        <div className="admin-dashboard">
            <Row>
                <Col md={6}>
                    <Card size="small" title="Total Instructors">
                        <p>Card content</p>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card size="small" title="Total Students">
                        <p>Card content</p>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default AdminDashboardHome
