// ... existing code ...
<template>
  <div class="min-h-screen bg-[#050505] text-white p-10 flex flex-col items-center">
    <h1 class="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
      High-Tech Hover Effects
    </h1>
    <p class="text-gray-500 mb-12">Select your preferred interaction style</p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full">
      
      <!-- Option A: Holographic Scan -->
      <div class="space-y-4">
        <h2 class="text-xl font-bold text-cyan-400">A. 全息扫描 (Holographic Scan)</h2>
        <p class="text-sm text-gray-400 h-10">边框发光 + 内部扫描线扫过 + 背景微亮</p>
        
        <div class="relative h-48 border border-gray-800 bg-[#0a0a0a] overflow-hidden group cursor-pointer transition-all duration-300 hover:border-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]">
          <!-- Scan Line -->
          <div class="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out"></div>
          
          <!-- Content -->
          <div class="p-6 relative z-10">
            <div class="flex justify-between items-start mb-4">
              <div class="w-12 h-12 bg-gray-800 rounded flex items-center justify-center text-gray-500 group-hover:text-cyan-400 group-hover:bg-cyan-900/20 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <span class="text-xs font-mono text-gray-600 group-hover:text-cyan-500 transition-colors">ID: 8492</span>
            </div>
            <h3 class="text-lg font-bold mb-2 group-hover:text-cyan-50 transition-colors">System Override</h3>
            <p class="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">Initiating core sequence protocol. Access granted.</p>
          </div>
        </div>
      </div>

      <!-- Option B: Corner Brackets -->
      <div class="space-y-4">
        <h2 class="text-xl font-bold text-cyan-400">B. 四角锁定 (Corner Brackets)</h2>
        <p class="text-sm text-gray-400 h-10">四角出现锁定框 + 边框消失 + 战术聚焦</p>
        
        <div class="relative h-48 border border-gray-800 bg-[#0a0a0a] group cursor-pointer transition-all duration-200 hover:border-transparent">
          <!-- Corners -->
          <div class="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"></div>
          <div class="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"></div>
          <div class="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"></div>
          <div class="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"></div>

          <!-- Content -->
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div class="w-12 h-12 bg-gray-800 rounded flex items-center justify-center text-gray-500 group-hover:text-white group-hover:bg-cyan-600 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </div>
              <span class="text-xs font-mono text-gray-600 group-hover:text-cyan-500 transition-colors">LOCKED</span>
            </div>
            <h3 class="text-lg font-bold mb-2 group-hover:tracking-wider transition-all duration-300">Target Acquired</h3>
            <p class="text-sm text-gray-500">Subject identified. Tracking systems engaged.</p>
          </div>
        </div>
      </div>

      <!-- Option C: Data Flow -->
      <div class="space-y-4">
        <h2 class="text-xl font-bold text-cyan-400">C. 数据流光 (Data Flow)</h2>
        <p class="text-sm text-gray-400 h-10">底部流光条 + 背景径向渐变 + 信息高亮</p>
        
        <div class="relative h-48 border border-gray-800 bg-[#0a0a0a] overflow-hidden group cursor-pointer">
          <!-- Radial Gradient Background -->
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <!-- Bottom Flow Line -->
          <div class="absolute bottom-0 left-0 right-0 h-1 bg-gray-800 overflow-hidden">
            <div class="absolute inset-0 bg-cyan-500 -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
          </div>

          <!-- Content -->
          <div class="p-6 relative z-10">
            <div class="flex justify-between items-start mb-4">
              <div class="w-12 h-12 bg-gray-800 rounded flex items-center justify-center text-gray-500 group-hover:text-cyan-300 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
              </div>
              <span class="text-xs font-mono text-gray-600 group-hover:text-white transition-colors">UPLOADING...</span>
            </div>
            <h3 class="text-lg font-bold mb-2">Data Stream</h3>
            <p class="text-sm text-gray-500 group-hover:text-cyan-100 transition-colors">Transferring encrypted packets. Bandwidth optimal.</p>
          </div>
        </div>
      </div>

      <!-- Option D: Glassmorphism Charge -->
      <div class="space-y-4">
        <h2 class="text-xl font-bold text-cyan-400">D. 玻璃态充能 (Glass Charge)</h2>
        <p class="text-sm text-gray-400 h-10">毛玻璃背景 + 边缘发光 + 内容浮起</p>
        
        <div class="relative h-48 border border-gray-800 bg-[#0a0a0a] group cursor-pointer transition-all duration-300 hover:border-white/20">
          <!-- Glass Overlay -->
          <div class="absolute inset-0 bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          
          <!-- Glow Border -->
          <div class="absolute inset-0 rounded border border-white/10 opacity-0 group-hover:opacity-100 group-hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300"></div>

          <!-- Content -->
          <div class="p-6 relative z-10 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
            <div class="flex justify-between items-start mb-4">
              <div class="w-12 h-12 bg-gray-800 rounded flex items-center justify-center text-gray-500 group-hover:bg-white/10 group-hover:text-white transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
              </div>
              <span class="text-xs font-mono text-gray-600 group-hover:text-white/70 transition-colors">LAB-01</span>
            </div>
            <h3 class="text-lg font-bold mb-2 text-gray-200 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Quantum State</h3>
            <p class="text-sm text-gray-500 group-hover:text-gray-300">Coherence levels stabilizing. Reaction imminent.</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style>
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
</style>