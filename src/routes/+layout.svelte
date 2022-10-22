<script>
    import "../app.css";
  </script>
  
  <style>
    .main-bg{
      min-height: 100%;
      min-width: 100%;
      background-color: #0f172a;
      background: radial-gradient(at 50% bottom,#334155 #0f172a);
      color: #e2e8f0;
    }
  </style>

  <div class='main-bg'>
    <slot />

  </div>