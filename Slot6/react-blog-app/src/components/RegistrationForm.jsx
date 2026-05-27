import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';

function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

  const validateField = (name, value) => {
    switch (name) {
      case 'username':
        if (!value.trim()) return 'Username không được để trống.';
        return '';
      case 'email':
        if (!value.trim()) return 'Email không được để trống.';
        if (!emailRegex.test(value)) return 'Email không đúng định dạng.';
        return '';
      case 'password':
        if (!value) return 'Password không được để trống.';
        if (!passwordRegex.test(value)) {
          return 'Password phải từ 6 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt.';
        }
        return '';
      case 'confirmPassword':
        if (!value) return 'Confirm password không được để trống.';
        if (value !== formData.password) return 'Confirm password phải khớp với password.';
        return '';
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors = {
      username: validateField('username', formData.username),
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
      confirmPassword: validateField('confirmPassword', formData.confirmPassword),
    };

    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([, value]) => value)
    );

    setErrors(filteredErrors);
    return Object.keys(filteredErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitMessage('');

    if (validateForm()) {
      setSubmitMessage('Đăng ký thành công!');
      setFormData({ username: '', email: '', password: '', confirmPassword: '' });
      setErrors({});
      navigate('/home');
    } else {
      setSubmitMessage('Vui lòng sửa các lỗi trước khi đăng ký.');
    }
  };

  const handleCancel = () => {
    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
    setSubmitMessage('');
  };

  return (
    <Container fluid className="registration-page py-5">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col xs={12} md={8} lg={6}>
          <Card className="registration-card shadow-lg">
            <Card.Body>
              <div className="mb-4">
                <h3 className="mb-2 registration-title">Tạo tài khoản mới</h3>
                <p className="registration-note">
                  Đăng ký ngay để truy cập nội dung cá nhân và quản lý bài viết của bạn.
                </p>
              </div>

              {submitMessage && (
                <Alert variant={submitMessage.includes('thành công') ? 'success' : 'danger'}>
                  {submitMessage}
                </Alert>
              )}

              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                    placeholder="Nhập username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="Nhập email"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    placeholder="Nhập password"
                  />
                  <Form.Text className="text-muted password-hint">
                    Tối thiểu 6 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    isInvalid={!!errors.confirmPassword}
                    placeholder="Nhập lại password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex gap-3 justify-content-end">
                  <Button variant="outline-secondary" type="button" onClick={handleCancel} className="px-4">
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" className="px-4 btn-register">
                    Register
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RegistrationForm;
