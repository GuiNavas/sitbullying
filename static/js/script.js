// ===== SCRIPT PRINCIPAL DO SITE CONTRA O BULLYING =====

document.addEventListener('DOMContentLoaded', function() {
    // ===== INICIALIZAÇÃO =====
    initializeAnimations();
    initializeNavigation();
    initializeForms();
    initializeScrollEffects();
    initializeTooltips();
    initializeAdminHotspot();
    
    console.log('Site Contra o Bullying carregado com sucesso!');
});

// ===== ANIMAÇÕES =====
function initializeAnimations() {
    // Animação de entrada dos cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todos os cards
    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });

    // Animação de hover nos botões
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ===== NAVEGAÇÃO =====
function initializeNavigation() {
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Atualizar navbar ativa baseada na rota
    updateActiveNavItem();
    
    // Fechar navbar mobile ao clicar em um link
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

function updateActiveNavItem() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPath || 
            (currentPath === '/' && link.getAttribute('href') === '/')) {
            link.classList.add('active');
        }
    });
}

// ===== FORMULÁRIOS =====
function initializeForms() {
    // Validação de formulários
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                showFormError('Por favor, preencha todos os campos obrigatórios corretamente.');
            }
        });
    });

    // Validação em tempo real
    const inputs = document.querySelectorAll('input[required], textarea[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    let isValid = true;
    let errorMessage = '';
    
    // Verificar se está vazio
    if (!value) {
        errorMessage = 'Este campo é obrigatório.';
        isValid = false;
    }
    // Verificar email
    else if (fieldType === 'email' && !isValidEmail(value)) {
        errorMessage = 'Por favor, insira um email válido.';
        isValid = false;
    }
    // Verificar tamanho mínimo
    else if (field.hasAttribute('minlength')) {
        const minLength = parseInt(field.getAttribute('minlength'));
        if (value.length < minLength) {
            errorMessage = `Este campo deve ter pelo menos ${minLength} caracteres.`;
            isValid = false;
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('is-invalid');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('is-invalid');
    
    const errorDiv = field.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function showFormError(message) {
    // Remover mensagens de erro existentes
    const existingAlerts = document.querySelectorAll('.alert-danger');
    existingAlerts.forEach(alert => alert.remove());
    
    // Criar nova mensagem de erro
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger alert-dismissible fade show';
    alertDiv.innerHTML = `
        <i class="fas fa-exclamation-circle me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Inserir no topo do formulário
    const form = document.querySelector('form');
    if (form) {
        form.insertBefore(alertDiv, form.firstChild);
    }
}

// ===== EFEITOS DE SCROLL =====
function initializeScrollEffects() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.custom-navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Manter navbar sempre visível e sólida
        navbar.style.background = 'var(--white)';
        navbar.style.backdropFilter = 'none';
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
        navbar.style.left = '0';
        navbar.style.right = '0';
        navbar.style.zIndex = '1000';
        
        lastScrollTop = scrollTop;
    });
}

// ===== TOOLTIPS =====
function initializeTooltips() {
    // Inicializar tooltips do Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// ===== UTILITÁRIOS =====
function showLoading(element) {
    const originalText = element.innerHTML;
    element.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Carregando...';
    element.disabled = true;
    
    return function hideLoading() {
        element.innerHTML = originalText;
        element.disabled = false;
    };
}

function showSuccess(message) {
    showAlert(message, 'success');
}

function showError(message) {
    showAlert(message, 'danger');
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Inserir no topo da página
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
    }
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// ===== ANIMAÇÕES CSS DINÂMICAS =====
function addAnimationClass(element, className) {
    element.classList.add(className);
    setTimeout(() => {
        element.classList.remove(className);
    }, 1000);
}

// ===== CONTADOR ANIMADO =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start < target) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// ===== LAZY LOADING DE IMAGENS =====
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== PERFORMANCE =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== EXPORTAR FUNÇÕES GLOBAIS =====
window.BullyingSite = {
    showLoading,
    showSuccess,
    showError,
    showAlert,
    addAnimationClass,
    animateCounter
};

// ===== ADMIN HOTSPOT =====
function initializeAdminHotspot() {
    const hotspot = document.getElementById('admin-button');
    const brandLink = document.getElementById('navbar-brand-link');
    const brandLogo = document.getElementById('navbar-brand-logo');
    if (!hotspot) return;

    // Trigger fica fixo no canto direito da navbar; não precisa reposicionar

    const openAdminPrompt = async () => {
        const senha = prompt('Área restrita. Digite a senha de administrador:');
        if (!senha) return;
        try {
            // Tenta JSON e, em caso de falha de CORS/formato, tenta form-urlencoded
            let resp = await fetch('/admin-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: senha })
            });
            if (!resp.ok) {
                const formData = new URLSearchParams();
                formData.append('password', senha);
                resp = await fetch('/admin-login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: formData.toString()
                });
            }
            if (resp.ok) {
                // Recarrega a página para revelar o link Admin na navbar
                window.location.reload();
            } else {
                showError('Senha inválida.');
            }
        } catch (e) {
            showError('Falha de conexão. Tente novamente.');
        }
    };

    hotspot.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        openAdminPrompt();
    });

    // Atalhos extra: duplo clique e pressionar e segurar no logo/link
    // Removidos atalhos na logo
}
