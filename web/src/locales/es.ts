import { PriceDetails } from "../screens/Prompt/Create/PriceDetails";

export const es = {
  title: "Título",
  general: {
    likes: "Likes",
    sales: "Ventas",
    tested: "Verificado",
    email: "Email",
    save: "Guardar",
    cancel: "Cancelar",
    close: "Cerrar",
    currency: "€",
  },
  header: {
    home: "Inicio",
    platforms: "Plataformas",
    howItWorks: "Como funciona",
    becomeCreator: "Conviértete en creador",
    login: "Login",
    register: "Registro",
    logout: "Logout",
  },
  errors: {
    required: "Este campo es requerido",
    invalidEmail: "Email inválido",
    passwordDoesNotMatch: "Las contraseñas no coinciden",
  },
  home: {
    allCategories: "Todas las categorías",
    title: "Controla la IA con la experiencia de los mejores",
    search: "Buscar",
    searchPlaceholder: "Buscar por palabra clave",
    endOfResults: "Ya te lo has visto todo",
  },
  platforms: {
    title: "Top plataformas",
    upvoteSnack: "Voto enviado!",
  },
  login: {
    title: "Login",
    email: "Email",
    emailPlaceholder: "Email",
    password: "Contraseña",
    passwordPlaceholder: "Contraseña",
    submit: "Enviar",
    registerLink: "¿No tienes una cuenta? Regístrate",
    forgotPasswordLink: "¿Olvidaste tu contraseña?",
  },
  register: {
    title: "Registro",
    name: "Nombre",
    email: "Email",
    password: "Contraseña",
    confirmPassword: "Confirmar contraseña",
    submit: "Enviar",
    loginLink: "¿Ya tienes una cuenta? Login",
  },
  footer: {
    copyright: "© 2023 Prompt marketplace.",
    contact: "Contacto",
  },
  promptDetail: {
    description: "Descripción del Prompt",
    prompt: "El Prompt",
    tags: "Tags",
    similarPrompts: "Otros prompts que podrán gustarte",
    likeSnack: "Like hecho!",
    unlikeSnack: "Like eliminado!",
    alreadyVoted: "Ya ha votado",
  },
  validateEmail: {
    title: "Verificación de correo",
    description:
      "Te hemos enviado un código de validación a tu email. Introduce el código debajo para confirmar tu dirección de email. ",
    code: "Codigo",
    button: "Validar",
  },
  validationSuccess: {
    title: "Cuenta verificada",
  },
  forgotPassword: {
    title: "Olvidé mi contraseña",
    emailPlaceholder: "Email",
    submit: "Enviar",
  },
  forgotPasswordSuccess: {
    title: "Email enviado",
    text: "Hemos enviado un email con instrucciones para recuperar tu contraseña",
  },
  resetPassword: {
    title: "Restablecer contraseña",
    passwordPlaceholder: "Nueva contraseña",
    confirmPasswordPlaceholder: "Confirmar nueva contraseña",
    submit: "Enviar",
  },
  checkoutForm: {
    success: "Pago realizado con exito",
    error: "Error al realizar el pago",
  },
  profile: {
    profileMenu: "Perfil",
    editProfile: "Editar perfil",
    favoritesMenu: "Favoritos",
    myPromptsMenu: "Mis prompts",
  },
  editModal: {
    title: "Actualiza los detalles de tu cuenta",
    infoMenu: "Información básica",
    linksMenu: "Enlaces sociales",
    uploadYourPicture: "Sube tu imagen",
    updatePhotoLink: "Actualizar foto",
    updatePhotoText: "Asegúrate de que la foto no supere los 5 MB.",
    save: "Actualizar",
    success: "El usuario ha sido actualizado con éxito",
    linkedin: "LinkedIn URL",
    twitter: "Twitter URL",
    web: "Website URL",
  },
  fileUploader: {
    success: "El archivo se ha cargado con éxito",
  },
  myPromptsContent: {
    noPromptsTitle: "Todavía no hay prompts",
    text: "Cuando crees tu primer prompt, aparecerá aquí.",
    button: "Crea un prompt",
  },
  createPrompt: {
    basicInfo: {
      title: "Información básica",
      name: "¿Cómo se llama tu prompt?",
      namePlaceholder: "Nombre del prompt",
      nameText:
        "Este será el título de tu prompt. Con un título claro y descriptivo para que otros puedan identificarlo.",
      description: "Descripción del Prompt",
      descriptionPlaceholder: "Descripción",
      descriptionText:
        "Llama la atención de las personas con una breve descripción de tu prompt. Los usuarios lo verán en la parte superior de la página de tu prompt (máximo 140 caracteres).",
      whoIsFor: "¿Para quienes es este prompt?",
      whoIsForPlaceholder: "Para quienes es este prompt?",
      whoIsForText:
        "Explica para quién está destinado el prompt y cómo les beneficia. (máximo 140 caracteres)",
      howToUse: "¿Cómo se usa este prompt?",
      howToUsePlaceholder: "¿Cómo se usa este prompt?",
      howToUseText:
        "Asegúrate de agregar más funciones de validación para otros pasos si es necesario y manejar los errores de forma clara para el usuario.",
    },
    promptInfo: {
      title: "Información del Prompt",
      categories: "Elige categorías",
      categoriesText: "Select a maximum of two categories for the prompt",
      platforms: "Elige plataformas",
      platformsText:
        "Selecciona las plataformas en las que se puede usar el prompt",
      prompt: "Prompt",
      promptText:
        "Copia y pega tu prompt aquí. Asegúrate de agregar más funciones de validación para otros pasos si es necesario y manejar los errores de forma clara para el usuario.",
      promptPlaceholder: "Inserta el prompt",
    },
    price: {
      title: "Precio de venta",
      price: "¿Cual es el precio de venta?",
      priceText: "Establecer un precio razonable ayuda a que tengas más ventas",
      pricePlaceholder: "Precio de venta",
      priceGuideTitle: "Guía de precios",
      priceGuideText:
        "Establecer cuánto cobrar por un prompt puede depender de varios factores. Aquí tienes una guía en caso de que no sepas cómo fijar un precio.",
      priceGuideButton: "Ver guía",
      totalPrice: "Precio total",
      viewPriceDetails: "Ver detalles",
    },
  },
  priceGuide: {
    title: "Guía de precios",
    text: "Esta es una guía simple que puede ayudarte a establecer un precio adecuado:",
    simple:
      "<strong>Simple:</strong> Un prompt básico que no requiere mucha personalización puede tener un precio más bajo. Por ejemplo, entre $5 y $15.",
    moderate:
      "<strong>Moderado:</strong> Los prompts que requieren algo de investigación y personalización pueden estar en el rango de $15 a $50.",
    advanced:
      "<strong>Avanzado:</strong> Los prompts altamente personalizados y complejos, que pueden requerir conocimientos especializados o una considerable investigación, pueden costar entre $50 y $200 o más.",
    button: "Entendido",
  },
  priceDetails: {
    title: "Detalles del precio",
    costToUser: "Costo para el usuario",
    promptPrice: "Precio del prompt",
    servicePrice: "Costo del servicio",
    total: "Total",
    yourPayment: "Tu pago",
    benefit: "Beneficio por prompt",
    button: "Entendido",
  },
};
