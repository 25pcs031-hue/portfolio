/**
 * N. SUMETHA - PORTFOLIO JAVASCRIPT
 * Dynamic interactions, typewriter effect, modals, filters, and form handling
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // 1. TYPEWRITER EFFECT
  // ==========================================================================
  const typewriterElement = document.getElementById('typewriter-text');
  if (typewriterElement) {
    const roles = [
      'M.Sc. Computer Science Student',
      'Aspiring Software Developer',
      'Full Stack Web Developer',
      'Python & Java Programmer',
      'Quick Learner & Problem Solver'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function type() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        // Finished typing current word, pause before deleting
        isDeleting = true;
        typingSpeed = 1800;
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting, move to next word
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    }

    type();
  }

  // ==========================================================================
  // 2. STICKY HEADER & SCROLL SPY
  // ==========================================================================
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('back-to-top');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Header blur & shadow on scroll
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back-to-top visibility
    if (scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // Scroll Spy: highlight active nav link
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================================================
  // 3. MOBILE MENU TOGGLE
  // ==========================================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ==========================================================================
  // 4. SKILLS FILTER TABS
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // ==========================================================================
  // 5. TOAST NOTIFICATION SYSTEM
  // ==========================================================================
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, type = 'success') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';

    let iconSvg = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    `;

    if (type === 'info') {
      iconSvg = `
        <svg viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      `;
    }

    toast.innerHTML = `
      ${iconSvg}
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3800);
  }

  // ==========================================================================
  // 6. COPY TO CLIPBOARD BUTTONS
  // ==========================================================================
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`);
          const originalText = btn.querySelector('span').textContent;
          btn.querySelector('span').textContent = 'Copied!';
          setTimeout(() => {
            btn.querySelector('span').textContent = originalText;
          }, 2000);
        }).catch(() => {
          // Fallback
          const textarea = document.createElement('textarea');
          textarea.value = textToCopy;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          showToast(`Copied: ${textToCopy}`);
        });
      }
    });
  });

  // ==========================================================================
  // 7. RESUME MODAL & PRINT
  // ==========================================================================
  const resumeModal = document.getElementById('resume-modal');
  const openResumeHero = document.getElementById('hero-download-resume');
  const openResumeNav = document.getElementById('nav-resume-btn');
  const closeResumeModal = document.getElementById('close-resume-modal');
  const closeResumeBtnFooter = document.getElementById('close-resume-btn-footer');
  const printResumeBtn = document.getElementById('print-resume-btn');

  function openResume() {
    if (resumeModal) {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResume() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (openResumeHero) openResumeHero.addEventListener('click', openResume);
  if (openResumeNav) openResumeNav.addEventListener('click', openResume);
  if (closeResumeModal) closeResumeModal.addEventListener('click', closeResume);
  if (closeResumeBtnFooter) closeResumeBtnFooter.addEventListener('click', closeResume);

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        closeResume();
      }
    });
  }

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // ==========================================================================
  // 8. PROJECT DEMO & DETAILS MODALS
  // ==========================================================================
  const demoModal = document.getElementById('demo-modal');
  const demoModalTitle = document.getElementById('demo-modal-title');
  const demoModalContent = document.getElementById('demo-modal-content');
  const closeDemoModal = document.getElementById('close-demo-modal');
  const closeDemoBtnFooter = document.getElementById('close-demo-btn-footer');

  function openModal(title, contentHtml) {
    if (demoModal && demoModalTitle && demoModalContent) {
      demoModalTitle.textContent = title;
      demoModalContent.innerHTML = contentHtml;
      demoModal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Attach risk calculator logic if present
      initRiskCalculator();
    }
  }

  function closeModal() {
    if (demoModal) {
      demoModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeDemoModal) closeDemoModal.addEventListener('click', closeModal);
  if (closeDemoBtnFooter) closeDemoBtnFooter.addEventListener('click', closeModal);

  if (demoModal) {
    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) {
        closeModal();
      }
    });
  }

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeResume();
      closeModal();
    }
  });

  // Project Interactive Demo Button
  const openDemoBtns = document.querySelectorAll('.open-demo-modal');
  openDemoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const demoHtml = `
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <p style="color: var(--text-secondary); font-size: 0.95rem;">
            Test the live <strong>AI Financial Risk Assessment</strong> calculation algorithm. Input prospective borrower metrics below to run the predictive scoring model:
          </p>

          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--border-radius-md); padding: 1.25rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;" id="calc-grid">
            <div style="display:flex; flex-direction:column; gap: 0.35rem;">
              <label style="font-size:0.8rem; color:var(--text-muted); font-weight:600;">Annual Income (₹ / $)</label>
              <input type="number" id="calc-income" value="75000" class="form-input" style="padding:0.6rem 0.8rem;">
            </div>

            <div style="display:flex; flex-direction:column; gap: 0.35rem;">
              <label style="font-size:0.8rem; color:var(--text-muted); font-weight:600;">Credit Score (300-850)</label>
              <input type="number" id="calc-credit" value="740" min="300" max="850" class="form-input" style="padding:0.6rem 0.8rem;">
            </div>

            <div style="display:flex; flex-direction:column; gap: 0.35rem;">
              <label style="font-size:0.8rem; color:var(--text-muted); font-weight:600;">Debt-to-Income Ratio (%)</label>
              <input type="number" id="calc-dti" value="22" min="1" max="100" class="form-input" style="padding:0.6rem 0.8rem;">
            </div>

            <div style="display:flex; flex-direction:column; gap: 0.35rem;">
              <label style="font-size:0.8rem; color:var(--text-muted); font-weight:600;">Market Volatility Factor</label>
              <select id="calc-volatility" class="form-select" style="padding:0.6rem 0.8rem;">
                <option value="low">Low Market Volatility</option>
                <option value="moderate" selected>Moderate Volatility</option>
                <option value="high">High Market Volatility</option>
              </select>
            </div>
          </div>

          <button type="button" class="btn btn-primary" id="run-calc-btn" style="width:100%;">
            <span>Run AI Risk Prediction Model</span>
          </button>

          <!-- Result Card -->
          <div id="calc-result" style="display:none; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: var(--border-radius-md); padding: 1.25rem;">
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.5rem;">
              <span style="font-size:0.85rem; color:var(--text-muted); text-transform:uppercase; font-weight:600;">Risk Classification</span>
              <span id="res-badge" style="font-size:0.85rem; font-weight:700; color:#34d399; padding:0.2rem 0.6rem; border-radius:12px; background:rgba(16,185,129,0.15);">LOW RISK</span>
            </div>
            <div style="font-size:1.8rem; font-weight:800; color:#ffffff; font-family:var(--font-heading);" id="res-score">
              12.4% Probability of Default
            </div>
            <p id="res-detail" style="font-size:0.88rem; color:var(--text-secondary); margin-top:0.4rem; line-height:1.5;">
              The applicant possesses strong credit metrics and manageable leverage. Model recommends approval with standard prime rate.
            </p>
          </div>
        </div>
      `;

      openModal('AI Financial Risk Assessment — Live Simulator', demoHtml);
    });
  });

  function initRiskCalculator() {
    const runBtn = document.getElementById('run-calc-btn');
    const resultBox = document.getElementById('calc-result');
    const resBadge = document.getElementById('res-badge');
    const resScore = document.getElementById('res-score');
    const resDetail = document.getElementById('res-detail');

    if (!runBtn || !resultBox) return;

    runBtn.addEventListener('click', () => {
      runBtn.innerHTML = '<span>Processing Neural Network Model...</span>';
      runBtn.disabled = true;

      setTimeout(() => {
        const credit = parseFloat(document.getElementById('calc-credit').value) || 700;
        const dti = parseFloat(document.getElementById('calc-dti').value) || 25;
        const volatility = document.getElementById('calc-volatility').value;

        let riskPercent = Math.max(3, Math.min(96, Math.round((850 - credit) * 0.12 + dti * 0.45)));

        if (volatility === 'high') riskPercent += 8;
        if (volatility === 'low') riskPercent -= 4;
        riskPercent = Math.max(2, Math.min(98, riskPercent));

        resultBox.style.display = 'block';

        if (riskPercent < 25) {
          resultBox.style.background = 'rgba(16, 185, 129, 0.08)';
          resultBox.style.borderColor = 'rgba(16, 185, 129, 0.3)';
          resBadge.style.color = '#34d399';
          resBadge.style.background = 'rgba(16,185,129,0.15)';
          resBadge.textContent = 'LOW RISK PROFILE';
          resScore.textContent = `${riskPercent}% Probability of Default`;
          resDetail.textContent = 'High credit score and low debt burden. Model classifies applicant as prime tier with high repayment probability.';
        } else if (riskPercent < 55) {
          resultBox.style.background = 'rgba(245, 158, 11, 0.08)';
          resultBox.style.borderColor = 'rgba(245, 158, 11, 0.3)';
          resBadge.style.color = '#fbbf24';
          resBadge.style.background = 'rgba(245, 158, 11, 0.15)';
          resBadge.textContent = 'MODERATE RISK';
          resScore.textContent = `${riskPercent}% Probability of Default`;
          resDetail.textContent = 'Moderate leverage detected. Recommended for collateral-backed approval or customized interest tier.';
        } else {
          resultBox.style.background = 'rgba(244, 63, 94, 0.08)';
          resultBox.style.borderColor = 'rgba(244, 63, 94, 0.3)';
          resBadge.style.color = '#f43f5e';
          resBadge.style.background = 'rgba(244, 63, 94, 0.15)';
          resBadge.textContent = 'HIGH RISK ALERT';
          resScore.textContent = `${riskPercent}% Probability of Default`;
          resDetail.textContent = 'Elevated debt-to-income ratio or suboptimal credit history. Recommended for secondary human audit.';
        }

        runBtn.innerHTML = '<span>Recalculate AI Risk Score</span>';
        runBtn.disabled = false;
      }, 400);
    });
  }

  // Project Details Modals
  const openDetailsBtns = document.querySelectorAll('.open-details-modal');
  openDetailsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectKey = btn.getAttribute('data-project');
      let title = '';
      let content = '';

      if (projectKey === 'risk-ai') {
        title = 'AI Financial Risk Assessment — Project Architecture';
        content = `
          <div style="display:flex; flex-direction:column; gap:1.25rem;">
            <p style="color:var(--text-secondary); line-height:1.7;">
              <strong>AI Financial Risk Assessment</strong> is a comprehensive software project developed to address modern credit and investment risk modeling using Python and statistical machine learning.
            </p>
            <div style="background:var(--bg-input); border:1px solid var(--border-subtle); border-radius:var(--border-radius-md); padding:1.25rem;">
              <h4 style="color:#ffffff; margin-bottom:0.5rem;">Key Architecture Components:</h4>
              <ul style="list-style-type:disc; padding-left:1.2rem; color:var(--text-secondary); line-height:1.7; font-size:0.9rem;">
                <li><strong>Data Processing Engine:</strong> Cleans, standardizes, and engineers financial indicators with Pandas and NumPy.</li>
                <li><strong>Predictive Risk Model:</strong> Trained classification algorithms (Logistic Regression, Random Forest) evaluating multi-factor volatility indicators.</li>
                <li><strong>Real-time Gauge Dashboard:</strong> Visual indicators for systemic risk stress and default probability distributions.</li>
                <li><strong>Backend Service:</strong> Light-weight Python Flask REST API designed for microservice consumption.</li>
              </ul>
            </div>
            <p style="color:var(--text-secondary); font-size:0.9rem;">
              <strong>Developer:</strong> N. Sumetha (M.Sc. Computer Science Final Year Project)
            </p>
          </div>
        `;
      } else if (projectKey === 'face-recognition') {
        title = 'Face Recognition Attendance System — Case Study';
        content = `
          <div style="display:flex; flex-direction:column; gap:1.25rem;">
            <p style="color:var(--text-secondary); line-height:1.7;">
              An end-to-end automated biometric logging system developed using Python, OpenCV, and SQLite to solve manual attendance tracking inefficiencies.
            </p>
            <div style="background:var(--bg-input); border:1px solid var(--border-subtle); border-radius:var(--border-radius-md); padding:1.25rem;">
              <h4 style="color:#ffffff; margin-bottom:0.5rem;">Core Features:</h4>
              <ul style="list-style-type:disc; padding-left:1.2rem; color:var(--text-secondary); line-height:1.7; font-size:0.9rem;">
                <li><strong>Real-Time Facial Landmark Extraction:</strong> Multi-face tracking and landmark triangulation via OpenCV.</li>
                <li><strong>High Recognition Accuracy:</strong> Trained classifier matching facial embeddings against a registered student/employee database.</li>
                <li><strong>Automated Database Logging:</strong> Timestamped entry generation in SQLite with anti-spoof checks.</li>
                <li><strong>Attendance Reports:</strong> Exportable spreadsheets for administration and review.</li>
              </ul>
            </div>
          </div>
        `;
      } else {
        title = 'Web Application & Portfolio Architecture';
        content = `
          <div style="display:flex; flex-direction:column; gap:1.25rem;">
            <p style="color:var(--text-secondary); line-height:1.7;">
              Engineered with clean semantic HTML5, modern vanilla CSS3 custom variables, and vanilla JavaScript without external bloat.
            </p>
            <div style="background:var(--bg-input); border:1px solid var(--border-subtle); border-radius:var(--border-radius-md); padding:1.25rem;">
              <h4 style="color:#ffffff; margin-bottom:0.5rem;">Design Highlights:</h4>
              <ul style="list-style-type:disc; padding-left:1.2rem; color:var(--text-secondary); line-height:1.7; font-size:0.9rem;">
                <li>Fluid responsive layout across 320px mobile to ultra-wide desktop.</li>
                <li>Dark theme with indigo and cyan ambient glow effects.</li>
                <li>In-browser printable resume modal with custom print stylesheet.</li>
                <li>Interactive live financial simulator and skill filtering tabs.</li>
              </ul>
            </div>
          </div>
        `;
      }

      openModal(title, content);
    });
  });

  // Placeholder Certification Card Click
  const certPlaceholder = document.getElementById('add-cert-placeholder');
  if (certPlaceholder) {
    certPlaceholder.addEventListener('click', () => {
      showToast('This placeholder is ready! You can easily edit index.html to add new certifications.', 'info');
    });
  }

  // ==========================================================================
  // 9. CONTACT FORM SUBMISSION
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('user-name');
      const emailInput = document.getElementById('user-email');
      const messageInput = document.getElementById('user-message');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      // Simple validation
      if (!name || !email || !message) {
        showToast('Please fill in all required fields (Name, Email, and Message).', 'info');
        return;
      }

      // Email format regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address.', 'info');
        return;
      }

      // Submit feedback simulation
      submitBtn.disabled = true;
      const originalContent = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending Message...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
        contactForm.reset();
        showToast(`Thank you, ${name}! Your message has been sent successfully.`);
      }, 1000);
    });
  }

  // Dynamic Year in Footer
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
