const handleSubmit = async () => {
  try {
    const res = await fetch('http://localhost:5000/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        company: 'Orange Army Fans',
        service: 'marketing',
        message: 'Hi! I love the Orange Army and want to collaborate!',
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(`✅ Success: ${data.message}`);
    } else {
      alert(`❌ Error: ${data.message}`);
      console.error(data.error);
    }
  } catch (err) {
    alert('❌ Failed to connect to the server.');
    console.error(err);
  }
};
