<template>
  <footer class="footer">
    <span class="footer-content">
      <div class="Footer-img">
        <img class="footer-logo" src="/src/assets/Images/Logo/S-I-S Logo.png" alt="footer logo" />
      </div>
      <div class="footer-grid">
        <div class="footer-grid-left">
          <p class="apologies">
            Apologies as we currently do not have a physical location for you to reach out to us.
            However we have our social media and content platforms where we may be reachable.
          </p>
        </div>
        <div class="Details">
          <a class="Detail-links" href="#">About Us</a>
          <a class="Detail-links" href="#">FAQs</a>
          <a class="Detail-links" href="#">Contact Us</a>
          <a class="Detail-links" href="#">Terms & Service</a>
          <a class="Detail-links" href="#">Privacy Policy</a>
        </div>
        <div class="Our-links">
          <a class="social-links" href="#">N1ghtW0lf04</a>
          <a class="social-links" href="https://beacons.ai/ferralwolf2003">FerralWolf2003</a>
          <a class="social-links" href="#">ibedrippinYT</a>
        </div>
      </div>
      <div class="footer-social-icons">
        <p class="copyright">&copy; 2026 S-I-S SQUAD</p>
      </div>
    </span>
  </footer>
</template>
<script setup></script>

<style>
.footer {
  background-color: var(--color-promo);
  padding: 1rem 2rem;
  width: 100vw;
}
.footer-logo {
  height: 100px;
  margin: 0;
}
.apologies {
  color: #ebebeb;
  width: 40vw;
}
.Our-links {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
.footer-grid {
  display: grid;
  grid-template-columns: 450px 400px 300px;
  gap: 7rem;
  user-select: none;
}
.Details {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.social-links,
.Detail-links {
  cursor: pointer;
  color: #4f8cff;
  height: 20px;
  width: 150px;
  text-decoration: none;
}

.social-links:hover,
.Detail-links:hover {
  color: #9595ff;
  transform: translateY(-2px);
  font-size: 17px;
}

.social-links:active,
.Detail-links:active {
  color: #3434dd;
  transform: translateY(2px);
  font-size: 14px;
}

.footer-social-icons {
  display: flex;
  gap: 0.8rem;
  align-items: center;
  color: #fff;
}

.copyright {
  user-select: none;
  font-size: 14px;
}

.footer-icon {
  color: #d8d8d8;
  cursor: pointer;
}
.yt:hover,
.yt:active {
  color: #ff0000;
}
.twitch:hover,
.twitch:active {
  color: #6705d8;
}
.fb:hover,
.fb:active {
  color: #356ee9;
}
.twitter:hover,
.twitter:active {
  color: #00e1ff;
}
.insta:hover,
.insta:active {
  color: #cd06ff;
}
</style>
