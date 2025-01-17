<template>
  <div class="grid-left">
    <h1 class="heading-primary">Welcome to S-I-S SQUAD Merch Line</h1>
    <p class="why">
      Here at S-I-S SQUAD we decided to provide you with some
      <strong>DRIPPY</strong> merch. <br />We figured we enjoy content creation so much why not give
      back to our squad.
    </p>
    <p class="partnership">
      We managed to fing ourselves a great partnership with
      <a href="https://www.dubby.gg/discount/MidN1ght?ref=spB4fv3CyQJAij" class="dubby">DUBBY</a>
      who provide powdered based energy drinks to your door for cheaper than their competitors.
    </p>
    <p class="shameless-plug">
      You can use Code S-I-S SQUAD at checkout for 10% off. (This is auto applied in the link)
    </p>
    <div class="comment">
      <div class="quote">
        <p class="quote-text">
          "Best drink i've ever had its cheaper and healthier than others, would definitley
          recommend"
        </p>
      </div>
      <div class="quote-flex">
        <div class="quote-picture">
          <!-- <img class="quote-logo" src="Images/quote img.png" /> -->
        </div>
        <div class="quotee">
          <p class="name">N1ghtW0lf04</p>
          <p class="Relation">S-I-S SQUAD Co. Founder</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style>
.grid-left {
  color: whitesmoke;
  padding: 2rem;
  width: 700px;
  background-color: var(--color-promo);
  border: none;
  border-radius: 11px;
  box-shadow: var(--box-shadow);
}

.heading-primary {
  font-size: 30px;
}

.comment {
  color: #000;
  width: 300px;
  padding: 1rem;
  border-radius: 6px;
  background-color: #fff2f2;
  box-shadow: 0 0 12px rgb(0, 225, 255);
  margin-top: 3rem;
}
.dubby {
  font-weight: 700;
  text-decoration: underline;
  color: var(--color-dubby);
}
.quote-text {
  margin-bottom: 15px;
}
.name {
  margin-bottom: 0;
  font-size: 14px;
}

.Relation {
  margin-top: 0;
  font-size: 12px;
  font-weight: 700;
}
.quote-flex {
  display: flex;
  align-items: center;
  position: relative;
  left: 5px;
}
.quote-logo {
  height: 50px;
  border-radius: 50px;
  padding-top: 10px;
}
.quotee {
  position: relative;
  right: 5px;
  bottom: 2px;
}
</style>
