<template>
  <div class="auth-content">
      <div class="auth-modal">
          <img src="../../assets/logo.png" width="200" alt="Logo">
          <hr>
          <div class="auth-title">Login</div>
          
            <div class="div-input">
                <b-form-input name="email" class="input-login" v-model="user.email" placeholder="Email" />
                <span v-if="errorEmptyEmail" class="empty-user">Insira seu email</span>
            </div>

            <div class="div-input">
                <b-form-input name="password" v-model="user.password" type="password" placeholder="Senha" />
                <span v-if="errorEmptyPassword" class="empty-user">Insira sua senha</span>
            </div>


            <b-button variant="primary" @click="signIn" class="button">Entrar</b-button>
      </div>
  </div>
</template>

<script>
import authApi from '../../services/api/authApi'
import { userKey } from '../../config/constants/constants'

export default {
    name: 'Auth',
    data() {
        return {
            showSignUp: false,
            user: {},
            errorEmptyEmail: false,
            errorEmptyPassword: false
        }
    },
    methods: {
        async signIn() {
            if (this.user.email && this.user.password) {
                try {
                    let responseLogin = await authApi.login(this.user.email, this.user.password)

                    let responseJson = responseLogin.data
                    console.log('response login: ', responseJson.user)
                    if (responseJson.success) {
                        this.$store.commit('setUser', responseJson.user)

                        if (this.$store.state.user) {
                            console.log('Preencheu')
                            this.$store.commit('toggleMenu', true)
                            localStorage.setItem(userKey, JSON.stringify(responseJson.user)) //Convert to string and save in local storage
                            this.$router.push({ path: '/' })
                        }

                    } else {
                        this.$toasted.global.defaultError({ msg: responseJson.message })
                    }
                } catch (error) {
                    this.$toasted.global.defaultError({ msg: 'Falha ao tentar realizar o login' })
                }
            } else {
                if (!this.user.email) {
                    this.errorEmptyEmail = true
                }
                if (!this.errorEmptyPassword) {
                    this.errorEmptyPassword = true
                }
            }
        },
        signOut() {

        },
    }
}
</script>

<style>
    .auth-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal {
        background-color: #fff;
        width: 450px;
        padding: 35px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
        display: flex;
        flex-direction: column;
        /*align-items: center;*/
    }

    .auth-title {
        font-size: 1.2rem;
        font-weight: 100;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .auth-modal input {
        border: 1px solid #bbb;
        width: 100%;
        padding: 3px 8px; /*Para o texto nao ficar grudado na caixa de texto (O primeiro é vertical, segundo é horizontal) */
    }

    .input-login {
        width: 100%;
    }

    .div-input {
        margin-bottom: 15px;
    }

    .button {
        width: 60%;
        box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);
        margin-top: 15px;
        align-self: center;
    }

    .auth-modal hr {
        border: 0;
        width: 100%;
        height: 2px;
        background-image: linear-gradient(to right, rgba(120,120,120, 0), rgba(120,120,120, 0.75), rgba(120,120,120, 0));
    }
</style>