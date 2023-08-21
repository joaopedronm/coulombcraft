document.addEventListener('DOMContentLoaded', () => {
    const calculateButton = document.getElementById('calculate');
    const resultDisplay = document.getElementById('result');
    const animationContainer = document.querySelector('.animation-container');
    const sphere1 = document.querySelector('.sphere1');
    const sphere2 = document.querySelector('.sphere2');
    let animationTimeout;
  
    calculateButton.addEventListener('click', () => {
  
      const q1 = parseFloat(document.getElementById('q1').value);
      const q1Prefix = document.getElementById('q1Prefix').value;
      const q2 = parseFloat(document.getElementById('q2').value);
      const q2Prefix = document.getElementById('q2Prefix').value;
  
      const distance = parseFloat(document.getElementById('distance').value) / 1000; // Converter mm para m
  
      const q1Coulombs = q1 * Math.pow(10, -3 * (q1Prefix === 'm' ? 1 : (q1Prefix === 'u' ? 2 : (q1Prefix === 'n' ? 3 : 12))));
      const q2Coulombs = q2 * Math.pow(10, -3 * (q2Prefix === 'm' ? 1 : (q2Prefix === 'u' ? 2 : (q2Prefix === 'n' ? 3 : 12))));
  
      const k = 8.99 * Math.pow(10, 9); // Constante de Coulomb (N m^2 / C^2)
      const force = k * (q1Coulombs * q2Coulombs) / Math.pow(distance, 2);
  
      resultDisplay.textContent = `Módulo da Força Elétrica: ${force.toFixed(2)} N`;
  
      // Update sphere positions based on charges
      const q1Class = q1 > 0 ? 'proton' : 'electron';
      const q2Class = q2 > 0 ? 'proton' : 'electron';
      sphere1.className = `sphere sphere1 ${q1Class}`;
      sphere2.className = `sphere sphere2 ${q2Class}`;
  
      // Clear previous animation and then start new animation
      clearTimeout(animationTimeout);
  
      if (force > 0) {
        const animationDuration = 4000; // Tempo da animação em milissegundos
        const translation = 200; // Distância de aproximação
  
        sphere1.style.transform = `translateX(calc(100% + ${translation}px))`;
        sphere2.style.transform = `translateX(calc(100% - ${translation}px))`;
  
        animationTimeout = setTimeout(() => {
          sphere1.style.transform = 'translateX(0)';
          sphere2.style.transform = 'translateX(0)';
        }, animationDuration);
      } else {
        const animationDuration = 4000; // Tempo da animação em milissegundos
        const translation = 200; // Distância de afastamento
  
        sphere1.style.transform = 'translateX(0)';
        sphere2.style.transform = 'translateX(0)';
  
        animationTimeout = setTimeout(() => {
          sphere1.style.transform = 'translateX(0)';
          sphere2.style.transform = `translateX(calc(100% + ${translation}px))`;
        }, animationDuration);
      }
    });
  });
  