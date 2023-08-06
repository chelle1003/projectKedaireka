<template>
  <v-app style="background-color: #134280; height: 80%">
    <v-container>
      <v-img src="droneISAI.png" contain alt="logo"
        style="width: 350px;  margin-left: 50px; margin: auto; margin-top: 90px; "></v-img>
      <v-card tile elevation="0" style="width: 400px; height:300px; margin-left: 33%; background-color: #134280; ">
        <v-card-title class="home">

        </v-card-title>
        <v-form lazy validation @keyup.enter="login">
          <v-card-text>
            <v-text-field hide-details :rules="emailRules" label="E-Mail" type="text" v-model="email"
              style="background-color: white;"></v-text-field>
            <span style="color: red; font-weight: 700;">{{ errMsg }}</span>
            <v-text-field hide-details="auto" :rules="passwordRules" label="Password"
              :type="showPassword ? 'text' : 'password'" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="handleclick" v-model="password" style="margin-top: 30px; background-color: white;">
            </v-text-field>
          </v-card-text>
        </v-form>
        <v-card-actions class="pl-50">
          <v-checkbox label="remember me" v-model="rememberMe"
            style="color: black; font-weight: 700; padding-top: 20px; color: #FFFFFF;"></v-checkbox><br>
          <v-btn style=" background-color: #18A0FB; height: 44px; width: 152px; margin-right: 5px; color: white;"
            type="submit" @click="login">
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      rememberMe: false,
      rememberedEmail: "",
      showPassword: false,
      email: "",
      password: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      errMsg: "",
    };
  },
  mounted() {
    const rememberedEmail = Cookies.get('rememberedEmail');
    if (rememberedEmail) {
      this.email = rememberedEmail;
      this.rememberMe = true;
    }
  },

  methods: {
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          if (this.rememberMe) {
            Cookies.set('rememberedEmail', this.email);
          } else {
            Cookies.remove('rememberedEmail');
          }
          localStorage.setItem('authenticated', true);
          console.log(userCredential.user);
          if (this.email === 'admin@gmail.com') {
            this.$store.commit('setUser', 'admin');
          } else {
            this.$store.commit('setUser', '');
          }
          this.$router.push("/DataKarbon");
        })
        .catch((error) => {
          console.log(error.code);
          switch (error.code) {
            case "auth/invalid-email":
              this.errMsg = "Invalid email";
              break;
            case "auth/user-not-found":
              this.errMsg = "Account anda tidak ditemukan";
              break;
            case "auth/wrong-password":
              this.errMsg = "Password anda salah";
              break;
            default:
              this.errMsg = "Email or password was incorrect";
              break;
          }
        });
    },
    handleclick() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>