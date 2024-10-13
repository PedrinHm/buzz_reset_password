<template>
  <div class="reset-password-container">
    <div class="reset-password-box">
      <!-- Imagem da logo -->
      <img src="@/assets/app_icon.jpeg" alt="Logo do App" class="logo" />
      
      <!-- Título e subtítulo -->
      <h1>Redefina sua senha</h1>
      <p>Preencha abaixo sua nova senha...</p>

      <!-- Formulário de redefinição -->
      <form @submit.prevent="resetPassword">
        <div class="form-group">
          <label for="password">Nova Senha</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirme a Nova Senha</label>
          <input type="password" v-model="confirmPassword" id="confirmPassword" required />
        </div>
        
        <!-- Botão de redefinir senha -->
        <button type="submit" class="btn-reset-password" :disabled="loading">Redefinir senha</button>
        
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="success" class="success">{{ success }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      password: '',
      confirmPassword: '',
      loading: false,
      error: null,
      success: null,
    };
  },
  methods: {
    async resetPassword() {
      if (this.password !== this.confirmPassword) {
        this.error = "As senhas não coincidem.";
        return;
      }
      this.loading = true;
      this.error = null;
      try {
        const token = this.$route.query.token; // Pega o token da URL
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/reset-password`, {
          token,
          new_password: this.password,
        });
        this.success = response.data.message;
      } catch (err) {
        this.error = err.response?.data?.detail || "Erro ao redefinir senha.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Reseta o estilo da página para evitar margens brancas */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

* {
  box-sizing: inherit;
}

/* Background da página */
.reset-password-container {
  background-color: #395BC7; /* Cor de fundo */
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0; /* Remove margens extras */
  padding: 0;
}

/* Caixa central */
.reset-password-box {
  background-color: white;
  padding: 40px;
  border-radius: 15px; /* Bordas arredondadas */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

/* Logo do app */
.logo {
  width: 100px;
  height: auto;
  margin-bottom: 20px;
}

/* Estilos do título e subtítulo */
h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

p {
  color: #2c3e50;
  margin-bottom: 30px;
}

/* Formulário */
.form-group {
  margin-bottom: 20px;
}

input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

/* Botão de redefinir senha */
.btn-reset-password {
  background-color: #395BC7; /* Cor do botão */
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
}

.btn-reset-password:disabled {
  background-color: #7a8cb9;
  cursor: not-allowed;
}

/* Mensagens de erro e sucesso */
.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}
</style>
