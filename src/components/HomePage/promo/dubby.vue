<template>
  <section>
    <div class="dubby-container">
      <h1 class="dubby-header">DUBBY Products</h1>
      <img
        class="splatter"
        src="/src/assets/Images/promos/splatter.png"
        alt="splatter background image"
      />
      <div class="promoImage-container">
        <img
          class="sauce"
          src="/src/assets/Images/promos/Dubsauce-dubby.png"
          alt="dubby dubsauce flavour"
        />
        <img class="shaker" src="/src/assets/Images/promos/Shaker.png" alt="dubby shaker" />
        <img
          class="Peach"
          src="/src/assets/Images/promos/Peach-dubby.png"
          alt="dubby peach flavour"
        />
      </div>

      <div class="dubbyLink-container">
        <a
          class="dubby-link"
          target="_blank"
          href="https://www.dubby.gg/discount/MidN1ght?ref=spB4fv3CyQJAij"
          >Shop Now!</a
        >
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style>
.dubby-container {
  position: relative;
}

.dubby-header {
  text-align: center;
  color: var(--color-dubby);
  font-weight: 600;
  text-shadow: 1px 1px 2px black;
  z-index: 1;
}

.promoImage-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  height: 250px;
  margin-bottom: 30px;
}

.splatter {
  position: absolute;
  height: 450px;
  width: 550px;
  top: -20px;
  left: 50px;
  z-index: -1;
}

.sauce,
.Peach {
  position: relative;
  top: 50px;
}

.sauce {
  transform: rotate(-20deg);
  left: 170px;
  z-index: 1;
}

.Peach {
  transform: rotate(20deg);
  z-index: 2;
  right: 150px;
}

.shaker {
  position: relative;
  z-index: 3;
  left: 25px;
  height: 310px;
}

.dubbyLink-container {
  text-align: center;
}

.dubby-link {
  position: relative; /* Added this */
  color: var(--color-dubby);
  background-color: var(--color-promo);
  padding: 1rem;
  border-radius: 11px;
  display: inline-block; /* Ensure the display is not inline */
}

.dubby-link:hover {
  transform: translateY(-1px);
  background-color: rgb(70, 70, 70);
}

.dubby-link:active {
  transform: translateY(2px);
  background-color: rgb(35, 35, 35);
}
</style>
