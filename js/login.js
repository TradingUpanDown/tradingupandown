<script>
  const eyeIcon = document.querySelector('.eye-icon');
  const passwordInput = document.querySelector('input[type="password"]');

  eyeIcon.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    // Toggle eye icon image
    if (type === 'text') {
      eyeIcon.style.backgroundImage = "url('/assets/images/traderportal/reveal-password.svg')";
    } else {
      eyeIcon.style.backgroundImage = "url('/assets/images/traderportal/hide-password.svg')";
    }
  });
</script>
