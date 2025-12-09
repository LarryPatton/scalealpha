<template>
  <div class="min-h-screen bg-[#0f0f0f] text-white p-8">
    <div class="max-w-7xl mx-auto">
      <header class="mb-12 text-center">
        <h1 class="text-3xl font-bold mb-4">Timeline Design Variations</h1>
        <p class="text-gray-400">Select the best timeline style for the Attribution tab.</p>
        
        <!-- Style Switcher -->
        <div class="flex flex-wrap justify-center gap-4 mt-8">
          <button 
            v-for="(style, index) in styles" 
            :key="index"
            @click="currentStyle = index"
            class="px-6 py-2 rounded-full border transition-all"
            :class="currentStyle === index ? 'bg-blue-600 border-blue-500 text-white' : 'bg-[#1a1a1a] border-[#333] text-gray-400 hover:border-gray-500'"
          >
            {{ style.name }}
          </button>
        </div>

        <!-- Cyberpunk Solutions Switcher -->
        <div class="mt-8 pt-8 border-t border-[#333]">
          <h2 class="text-xl font-bold text-cyan-400 mb-4 tracking-widest uppercase">Cyberpunk Solutions</h2>
          <div class="flex flex-wrap justify-center gap-4">
            <button 
              @click="currentStyle = 10"
              class="px-6 py-2 rounded-none border transition-all relative group overflow-hidden"
              :class="currentStyle === 10 ? 'bg-cyan-900/30 border-cyan-500 text-cyan-400' : 'bg-[#151515] border-[#333] text-gray-500 hover:border-gray-500'"
            >
              <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-current"></div>
              <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current"></div>
              Solution A: Staggered Grid
            </button>
            <button 
              @click="currentStyle = 11"
              class="px-6 py-2 rounded-none border transition-all relative group overflow-hidden"
              :class="currentStyle === 11 ? 'bg-cyan-900/30 border-cyan-500 text-cyan-400' : 'bg-[#151515] border-[#333] text-gray-500 hover:border-gray-500'"
            >
              <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-current"></div>
              <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current"></div>
              Solution B: Wide Data Panel
            </button>
          </div>
        </div>
      </header>

      <!-- Preview Area -->
      <div class="bg-[#050505] rounded-2xl border border-[#333] p-8 min-h-[600px] relative overflow-hidden">
        <!-- Grid Background for Cyberpunk feel -->
        <div class="absolute inset-0 pointer-events-none opacity-10" 
             style="background-image: linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px); background-size: 40px 40px;">
        </div>
        
        <!-- Style 1: Classic Left (Bloomberg Style) -->
        <div v-if="currentStyle === 0" class="max-w-3xl mx-auto relative z-10">
          <div class="relative border-l border-[#333] ml-4 space-y-8 pb-8">
            <div v-for="event in events" :key="event.id" class="relative pl-8 group">
              <!-- Dot -->
              <div class="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#333] group-hover:bg-blue-500 transition-colors border border-[#111]"></div>
              
              <!-- Time -->
              <div class="text-xs font-mono text-blue-400 mb-1">{{ event.time }}</div>
              
              <!-- Card -->
              <div class="bg-[#1a1a1a] rounded-lg border border-[#333] p-4 hover:border-gray-500 transition-colors">
                <div class="flex gap-4">
                  <div class="flex-1">
                    <h3 class="font-bold text-lg mb-1">{{ event.title }}</h3>
                    <p class="text-sm text-gray-400 mb-3">{{ event.desc }}</p>
                    <div class="flex gap-2">
                      <span v-for="tag in event.tags" :key="tag" class="text-[10px] px-2 py-0.5 bg-[#222] rounded text-gray-500 border border-[#333]">{{ tag }}</span>
                    </div>
                  </div>
                  <div class="w-24 h-24 bg-[#222] rounded overflow-hidden shrink-0">
                    <img :src="event.image" class="w-full h-full object-cover opacity-80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Style 2: Center Axis (Alternating) -->
        <div v-if="currentStyle === 1" class="max-w-5xl mx-auto relative z-10">
          <div class="space-y-12 py-8">
            <div v-for="(event, index) in events" :key="event.id" class="relative flex items-center justify-between group">
              <!-- Center Dot -->
              <div class="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#111] border-2 border-[#333] group-hover:border-blue-500 group-hover:scale-110 transition-all z-10"></div>
              
              <!-- Left Side -->
              <div class="w-[45%] pr-8" :class="index % 2 === 0 ? 'text-right' : 'order-last pl-8 pr-0 text-left'">
                <div v-if="index % 2 === 0">
                  <div class="text-sm font-mono text-blue-400 mb-2">{{ event.time }}</div>
                  <div class="bg-[#1a1a1a] rounded-xl border border-[#333] p-5 hover:border-blue-500/50 transition-all hover:-translate-y-1 shadow-lg">
                    <h3 class="font-bold text-lg mb-2">{{ event.title }}</h3>
                    <p class="text-sm text-gray-400">{{ event.desc }}</p>
                  </div>
                </div>
                <div v-else class="opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                   <img :src="event.image" class="w-full h-48 object-cover rounded-xl border border-[#333]" />
                </div>
              </div>

              <!-- Right Side -->
              <div class="w-[45%] pl-8" :class="index % 2 === 0 ? '' : 'order-first pr-8 pl-0 text-right'">
                <div v-if="index % 2 !== 0">
                  <div class="text-sm font-mono text-blue-400 mb-2">{{ event.time }}</div>
                  <div class="bg-[#1a1a1a] rounded-xl border border-[#333] p-5 hover:border-blue-500/50 transition-all hover:-translate-y-1 shadow-lg">
                    <h3 class="font-bold text-lg mb-2">{{ event.title }}</h3>
                    <p class="text-sm text-gray-400">{{ event.desc }}</p>
                  </div>
                </div>
                <div v-else class="opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                   <img :src="event.image" class="w-full h-48 object-cover rounded-xl border border-[#333]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Style 3: Minimalist Stream (Twitter/X Style) -->
        <div v-if="currentStyle === 2" class="max-w-2xl mx-auto relative z-10">
          <div class="space-y-0 divide-y divide-[#333] border border-[#333] rounded-xl bg-[#1a1a1a] overflow-hidden">
            <div v-for="event in events" :key="event.id" class="p-6 hover:bg-[#222] transition-colors flex gap-4">
              <!-- Avatar/Icon -->
              <div class="shrink-0">
                <div class="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400 border border-blue-500/30">
                  <span class="font-bold text-xs">{{ event.stocks[0].symbol[0] }}</span>
                </div>
              </div>
              
              <div class="flex-1">
                <div class="flex items-baseline justify-between mb-1">
                  <div class="flex items-center gap-2">
                    <span class="font-bold text-white">{{ event.stocks[0].name }}</span>
                    <span class="text-gray-500 text-sm">@{{ event.stocks[0].symbol }}</span>
                  </div>
                  <span class="text-xs text-gray-500 hover:underline cursor-pointer">{{ event.time }}</span>
                </div>
                
                <p class="text-gray-300 text-sm leading-relaxed mb-3">{{ event.desc }}</p>
                
                <!-- Embedded Content -->
                <div class="rounded-xl border border-[#333] overflow-hidden bg-[#111] mb-3">
                  <div class="h-32 w-full relative">
                    <img :src="event.image" class="w-full h-full object-cover" />
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <h4 class="font-bold text-white text-sm">{{ event.title }}</h4>
                    </div>
                  </div>
                  <div class="p-3 flex items-center justify-between bg-[#151515]">
                    <div class="flex gap-4 text-xs">
                      <span class="text-green-400 font-mono">▲ 2.4%</span>
                      <span class="text-gray-500">Vol: 12.5M</span>
                    </div>
                    <button class="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded hover:bg-blue-600/30 transition-colors">Trade</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Style 4: Cyberpunk HUD (Data Heavy) -->
        <div v-if="currentStyle === 3" class="max-w-6xl mx-auto relative z-10">
          <div class="space-y-6">
            <div v-for="event in events" :key="event.id" class="flex gap-6 items-stretch group">
              <!-- Time Column -->
              <div class="w-24 text-right pt-6 shrink-0">
                <div class="text-2xl font-bold text-white font-mono">{{ event.time.split(' ')[0] }}</div>
                <div class="text-sm text-gray-500 font-mono uppercase">{{ event.time.split(' ')[1] }}</div>
              </div>
              
              <!-- Decoration Line -->
              <div class="w-px bg-[#333] relative group-hover:bg-cyan-500 transition-colors duration-300">
                <div class="absolute top-8 -left-[3px] w-1.5 h-1.5 bg-[#111] border border-cyan-500 rounded-full hidden group-hover:block shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
              </div>
              
              <!-- Card -->
              <div class="flex-1 bg-[#151515] border border-[#333] p-1 group-hover:border-cyan-500/50 transition-all relative overflow-hidden shadow-lg">
                <!-- Corner Accents -->
                <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-gray-500 group-hover:border-cyan-500"></div>
                <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-gray-500 group-hover:border-cyan-500"></div>
                <div class="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gray-500 group-hover:border-cyan-500"></div>
                <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gray-500 group-hover:border-cyan-500"></div>

                <div class="flex h-full">
                  <!-- Image (Left) -->
                  <div class="w-48 relative overflow-hidden border-r border-[#333] shrink-0">
                    <img :src="event.image" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                    <div class="absolute inset-0 bg-cyan-900/10 mix-blend-overlay"></div>
                    <div class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                      <h3 class="font-bold text-white text-lg leading-tight">{{ event.title }}</h3>
                    </div>
                  </div>

                  <!-- Content (Middle) -->
                  <div class="flex-1 p-5 flex flex-col justify-center">
                    <div class="flex items-center gap-3 mb-2">
                      <h3 class="text-xl font-bold text-white leading-tight">{{ event.title }}</h3>
                      <span 
                        class="text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider"
                        :class="event.stocks[0].change >= 0 ? 'bg-green-900/30 text-green-400 border-green-800' : 'bg-red-900/30 text-red-400 border-red-800'"
                      >
                        {{ event.stocks[0].change >= 0 ? 'Bullish' : 'Bearish' }}
                      </span>
                    </div>
                    
                    <p class="text-sm text-gray-400 leading-relaxed line-clamp-3">{{ event.desc }}</p>
                  </div>

                  <!-- Stocks List (Right) -->
                  <div class="w-64 bg-[#0a0a0a] border-l border-[#333] flex flex-col shrink-0 relative">
                    <div class="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
                      <div v-for="stock in event.stocks" :key="stock.symbol" class="bg-[#1a1a1a] border border-[#333] rounded p-2 flex items-center gap-3 hover:border-gray-500 transition-colors group/stock">
                        <!-- Icon -->
                        <div class="w-8 h-8 rounded bg-[#252525] flex items-center justify-center text-xs font-bold text-gray-400 border border-[#333] group-hover/stock:text-white group-hover/stock:border-gray-500 transition-colors shrink-0">
                          {{ stock.symbol[0] }}
                        </div>
                        
                        <!-- Info -->
                        <div class="flex-1 min-w-0">
                          <div class="text-sm font-bold text-white leading-none mb-1 truncate">{{ stock.symbol }}</div>
                          <div class="text-[10px] text-gray-500 truncate">{{ stock.name }}</div>
                        </div>
                        
                        <!-- Price -->
                        <div class="text-right shrink-0">
                          <div class="text-xs font-mono font-bold" :class="stock.change >= 0 ? 'text-red-400' : 'text-green-400'">
                            {{ stock.change >= 0 ? '+' : '' }}{{ stock.change }}%
                          </div>
                          <div class="text-[10px] text-gray-400 font-mono">$124.5</div>
                        </div>
                      </div>
                    </div>
                    <!-- Scroll Hint Gradient -->
                    <div class="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Style 5: Grouped Cards (Magazine) -->
        <div v-if="currentStyle === 4" class="max-w-6xl mx-auto relative z-10">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="event in events" :key="event.id" class="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#333] hover:border-gray-500 transition-all group flex flex-col">
              <div class="h-40 overflow-hidden relative">
                <img :src="event.image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div class="absolute top-3 left-3 bg-black/70 backdrop-blur px-2 py-1 rounded text-xs font-bold text-white border border-white/10">
                  {{ event.time }}
                </div>
              </div>
              <div class="p-5 flex-1 flex flex-col">
                <div class="flex gap-2 mb-3">
                  <span v-for="tag in event.tags" :key="tag" class="text-[10px] font-bold uppercase tracking-wider text-blue-400">{{ tag }}</span>
                </div>
                <h3 class="font-bold text-xl text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors">{{ event.title }}</h3>
                <p class="text-sm text-gray-400 line-clamp-3 mb-4 flex-1">{{ event.desc }}</p>
                
                <div class="flex items-center justify-between pt-4 border-t border-[#333] mt-auto">
                  <div class="flex -space-x-2">
                    <div v-for="stock in event.stocks" :key="stock.symbol" class="w-6 h-6 rounded-full bg-[#333] border border-[#1a1a1a] flex items-center justify-center text-[8px] text-gray-300" :title="stock.name">
                      {{ stock.symbol[0] }}
                    </div>
                  </div>
                  <button class="text-gray-400 hover:text-white transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Solution A: Staggered Grid HUD -->
        <div v-if="currentStyle === 10" class="max-w-7xl mx-auto relative z-10">
          <!-- Center Axis -->
          <div class="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-900 to-transparent -translate-x-1/2"></div>
          
          <div class="space-y-3 py-12">
            <div v-for="(event, index) in extendedEvents" :key="event.id" class="relative flex items-center justify-between group mb-12">
              <!-- Center Node -->
              <div class="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-[#0f0f0f] border-2 border-cyan-900 flex items-center justify-center z-10 group-hover:border-cyan-400 transition-colors shadow-[0_0_20px_rgba(8,145,178,0.3)] rounded-full">
                <div class="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
              </div>

              <!-- Left Side (Content or Empty) -->
              <div class="w-[45%]" :class="index % 2 === 0 ? 'text-right pr-16' : ''">
                <div v-if="index % 2 === 0" class="relative">
                  <!-- Connector Line -->
                  <div class="absolute top-1/2 -right-16 w-16 h-px bg-cyan-900 group-hover:bg-cyan-500 transition-colors"></div>
                  
                  <!-- Card -->
                  <div class="bg-[#111] border border-[#333] p-1 relative group-hover:border-cyan-500/50 transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:-translate-y-1 duration-300">
                    <!-- HUD Corners -->
                    <div class="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-cyan-700"></div>
                    <div class="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-cyan-700"></div>
                    
                    <div class="bg-[#151515] p-6">
                      <!-- Top: Text Content -->
                      <div class="flex justify-between items-start mb-3">
                        <span class="text-xs font-mono text-cyan-400 bg-black/60 backdrop-blur px-2 py-1 border border-cyan-900/50 rounded">{{ event.time }}</span>
                        <div class="flex gap-1">
                          <span v-for="tag in event.tags" :key="tag" class="text-[10px] text-gray-400 uppercase border border-[#333] px-1.5 py-0.5 bg-[#1a1a1a]">{{ tag }}</span>
                        </div>
                      </div>
                      
                      <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors leading-tight">{{ event.title }}</h3>
                      <p class="text-sm text-gray-400 mb-6 leading-relaxed">{{ event.desc }}</p>

                      <!-- Middle: Image Container -->
                      <div class="h-48 w-full relative overflow-hidden border border-[#333] mb-6 rounded-sm">
                        <img :src="event.image" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                        <div class="absolute inset-0 bg-gradient-to-t from-[#151515] to-transparent opacity-30"></div>
                      </div>
                      
                      <!-- Bottom: Asset Matrix (Grid) -->
                      <div class="border-t border-[#333] pt-4">
                        <div class="flex justify-between items-center mb-3">
                          <div class="text-[10px] text-cyan-600 uppercase tracking-wider font-bold">Impacted Assets</div>
                          <div class="h-px flex-1 bg-[#222] mx-3"></div>
                        </div>
                        <div class="grid grid-cols-3 gap-2">
                          <div v-for="stock in event.stocks.slice(0, 6)" :key="stock.symbol" class="bg-[#0f0f0f] border border-[#333] p-2 flex flex-col items-center hover:border-cyan-900 hover:bg-[#1a1a1a] transition-colors cursor-pointer group/stock">
                            <span class="text-xs font-bold text-gray-300 group-hover/stock:text-white">{{ stock.symbol }}</span>
                            <span class="text-[10px] font-mono mt-1 font-bold" :class="stock.change >= 0 ? 'text-green-500' : 'text-red-500'">
                              {{ stock.change > 0 ? '+' : '' }}{{ stock.change }}%
                            </span>
                          </div>
                          <div v-if="event.stocks.length > 6" class="bg-[#0f0f0f] border border-[#333] p-2 flex items-center justify-center text-xs text-gray-500 hover:text-white cursor-pointer hover:bg-[#1a1a1a] transition-colors">
                            +{{ event.stocks.length - 6 }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Empty side placeholder for balance -->
                <div v-else class="h-px"></div>
              </div>

              <!-- Right Side (Content or Empty) -->
              <div class="w-[45%]" :class="index % 2 === 0 ? '' : 'text-left pl-16'">
                <div v-if="index % 2 !== 0" class="relative">
                  <!-- Connector Line -->
                  <div class="absolute top-1/2 -left-16 w-16 h-px bg-cyan-900 group-hover:bg-cyan-500 transition-colors"></div>
                  
                  <!-- Card -->
                  <div class="bg-[#111] border border-[#333] p-1 relative group-hover:border-cyan-500/50 transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:-translate-y-1 duration-300">
                    <!-- HUD Corners -->
                    <div class="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-cyan-700"></div>
                    <div class="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-cyan-700"></div>
                    
                    <div class="bg-[#151515] p-6 text-left">
                      <!-- Top: Text Content -->
                      <div class="flex justify-between items-start mb-3">
                        <div class="flex gap-1">
                          <span v-for="tag in event.tags" :key="tag" class="text-[10px] text-gray-400 uppercase border border-[#333] px-1.5 py-0.5 bg-[#1a1a1a]">{{ tag }}</span>
                        </div>
                        <span class="text-xs font-mono text-cyan-400 bg-black/60 backdrop-blur px-2 py-1 border border-cyan-900/50 rounded">{{ event.time }}</span>
                      </div>
                      
                      <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors leading-tight">{{ event.title }}</h3>
                      <p class="text-sm text-gray-400 mb-6 leading-relaxed">{{ event.desc }}</p>

                      <!-- Middle: Image Container -->
                      <div class="h-48 w-full relative overflow-hidden border border-[#333] mb-6 rounded-sm">
                        <img :src="event.image" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                        <div class="absolute inset-0 bg-gradient-to-t from-[#151515] to-transparent opacity-30"></div>
                      </div>
                      
                      <!-- Bottom: Asset Matrix (Grid) -->
                      <div class="border-t border-[#333] pt-4">
                        <div class="flex justify-between items-center mb-3">
                          <div class="text-[10px] text-cyan-600 uppercase tracking-wider font-bold">Impacted Assets</div>
                          <div class="h-px flex-1 bg-[#222] mx-3"></div>
                        </div>
                        <div class="grid grid-cols-3 gap-2">
                          <div v-for="stock in event.stocks.slice(0, 6)" :key="stock.symbol" class="bg-[#0f0f0f] border border-[#333] p-2 flex flex-col items-center hover:border-cyan-900 hover:bg-[#1a1a1a] transition-colors cursor-pointer group/stock">
                            <span class="text-xs font-bold text-gray-300 group-hover/stock:text-white">{{ stock.symbol }}</span>
                            <span class="text-[10px] font-mono mt-1 font-bold" :class="stock.change >= 0 ? 'text-green-500' : 'text-red-500'">
                              {{ stock.change > 0 ? '+' : '' }}{{ stock.change }}%
                            </span>
                          </div>
                          <div v-if="event.stocks.length > 6" class="bg-[#0f0f0f] border border-[#333] p-2 flex items-center justify-center text-xs text-gray-500 hover:text-white cursor-pointer hover:bg-[#1a1a1a] transition-colors">
                            +{{ event.stocks.length - 6 }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Empty side placeholder -->
                <div v-else class="h-px"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Solution B: Wide Data Panel HUD -->
        <div v-if="currentStyle === 11" class="max-w-6xl mx-auto relative z-10">
          <div class="space-y-6">
            <div v-for="event in extendedEvents" :key="event.id" class="flex bg-[#111] border border-[#333] hover:border-cyan-500/50 transition-all group overflow-hidden min-h-[200px]">
              
              <!-- Left: Time & Status Strip -->
              <div class="w-12 bg-[#0a0a0a] border-r border-[#333] flex flex-col items-center py-4 shrink-0">
                <div class="w-2 h-2 bg-cyan-500 rounded-full mb-2 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
                <div class="flex-1 w-px bg-gradient-to-b from-cyan-900 to-transparent"></div>
              </div>

              <!-- Middle: Main Content -->
              <div class="flex-1 p-6 flex flex-col">
                <div class="flex items-center gap-3 mb-2">
                  <span class="text-sm font-mono text-cyan-400">{{ event.time }}</span>
                  <div class="h-px flex-1 bg-[#222]"></div>
                  <span class="text-[10px] text-gray-500 uppercase tracking-wider">ID: {{ event.id }}</span>
                </div>
                
                <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{{ event.title }}</h3>
                <p class="text-gray-400 text-sm leading-relaxed mb-4 max-w-2xl">{{ event.desc }}</p>
                
                <div class="mt-auto flex gap-2">
                  <span v-for="tag in event.tags" :key="tag" class="text-[10px] px-2 py-1 bg-[#1a1a1a] border border-[#333] text-gray-400 rounded hover:border-gray-500 transition-colors cursor-pointer">#{{ tag }}</span>
                </div>
              </div>

              <!-- Right: Data Panel (Impacted Assets) -->
              <div class="w-[320px] bg-[#0a0a0a] border-l border-[#333] p-4 flex flex-col shrink-0">
                <div class="flex justify-between items-center mb-3 pb-2 border-b border-[#222]">
                  <span class="text-xs font-bold text-gray-400 uppercase">Market Impact</span>
                  <span class="text-[10px] text-cyan-600">{{ event.stocks.length }} Assets</span>
                </div>
                
                <div class="flex-1 overflow-y-auto pr-1 space-y-1 custom-scrollbar">
                  <div v-for="stock in event.stocks" :key="stock.symbol" class="flex items-center justify-between p-2 hover:bg-[#151515] rounded transition-colors group/stock cursor-pointer">
                    <div class="flex flex-col">
                      <span class="text-xs font-bold text-white group-hover/stock:text-cyan-400">{{ stock.symbol }}</span>
                      <span class="text-[9px] text-gray-600 truncate max-w-[80px]">{{ stock.name }}</span>
                    </div>
                    
                    <!-- Mini Sparkline Simulation -->
                    <div class="w-16 h-6 flex items-end gap-0.5 opacity-50 group-hover/stock:opacity-100">
                      <div v-for="n in 8" :key="n" class="w-1.5 bg-gray-700" 
                           :class="stock.change >= 0 ? 'bg-green-900' : 'bg-red-900'"
                           :style="{ height: Math.random() * 100 + '%' }"></div>
                    </div>

                    <div class="text-right w-14">
                      <div class="text-xs font-mono font-bold" :class="stock.change >= 0 ? 'text-green-500' : 'text-red-500'">
                        {{ stock.change > 0 ? '+' : '' }}{{ stock.change }}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentStyle = ref(0)

const styles = [
  { name: 'Classic Left', id: 'classic' },
  { name: 'Center Axis', id: 'center' },
  { name: 'Minimalist Stream', id: 'stream' },
  { name: 'Cyberpunk HUD', id: 'hud' },
  { name: 'Magazine Grid', id: 'magazine' }
]

// Mock Data (Same structure as InfoPageB)
const events = ref([
  { 
    id: 'evt-1',
    time: '10:30 AM', 
    title: 'NVDA Chip Delay', 
    desc: 'Reports indicate a 3-month delay in the new H200 chip shipment due to packaging constraints. Analysts are revising short-term revenue forecasts downward.', 
    stocks: [
      { symbol: 'NVDA', name: 'NVIDIA Corp', change: -3.45 },
      { symbol: 'AMD', name: 'Advanced Micro Devices', change: -1.20 },
      { symbol: 'TSM', name: 'Taiwan Semi', change: -0.80 },
      { symbol: 'INTC', name: 'Intel Corp', change: -1.50 },
      { symbol: 'QCOM', name: 'Qualcomm', change: -0.95 },
      { symbol: 'AVGO', name: 'Broadcom', change: -1.10 }
    ], 
    tags: ['Chips', 'AI', 'Supply Chain'], 
    image: 'https://placehold.co/400x200/1a4d2e/white?text=NVDA+Chip' 
  },
  { 
    id: 'evt-2',
    time: '09:15 AM', 
    title: 'Tesla Recall Announced', 
    desc: 'NHTSA mandates recall for 2 million vehicles over autopilot safety concerns. Software update to be deployed over-the-air immediately.', 
    stocks: [
      { symbol: 'TSLA', name: 'Tesla Inc', change: 1.80 },
      { symbol: 'RIVN', name: 'Rivian', change: 0.50 }
    ], 
    tags: ['EV', 'Auto', 'Regulation'], 
    image: 'https://placehold.co/400x200/4d1a1a/white?text=Tesla+Recall' 
  },
  { 
    id: 'evt-3',
    time: '08:45 AM', 
    title: 'Apple Vision Pro Pre-orders', 
    desc: 'Early pre-order numbers suggest higher than expected demand for the 256GB model. Supply chain sources hint at production ramp-up.', 
    stocks: [
      { symbol: 'AAPL', name: 'Apple Inc', change: 1.20 },
      { symbol: 'SONY', name: 'Sony Group', change: 0.90 }
    ], 
    tags: ['Tech', 'VR', 'Consumer'], 
    image: 'https://placehold.co/400x200/222/white?text=Vision+Pro' 
  },
  { 
    id: 'evt-4',
    time: 'Yesterday', 
    title: 'Fed Rate Decision', 
    desc: 'Federal Reserve holds rates steady, signaling a potential pivot later this year. Markets react positively to the dovish tone.', 
    stocks: [
      { symbol: 'SPY', name: 'S&P 500 ETF', change: 0.85 },
      { symbol: 'QQQ', name: 'Nasdaq 100', change: 1.10 },
      { symbol: 'TLT', name: '20+ Year Treasury', change: 1.50 }
    ], 
    tags: ['Macro', 'Fed', 'Rates'], 
    image: 'https://placehold.co/400x200/333/white?text=Fed+Rate' 
  },
  { 
    id: 'evt-5',
    time: 'Yesterday', 
    title: 'Oil Prices Surge', 
    desc: 'Geopolitical tensions in the Middle East drive crude oil prices above $80/barrel. Energy sector outperforms the broader market.', 
    stocks: [
      { symbol: 'XOM', name: 'Exxon Mobil', change: 2.10 },
      { symbol: 'CVX', name: 'Chevron', change: 1.80 }
    ], 
    tags: ['Energy', 'Commodities'], 
    image: 'https://placehold.co/400x200/552200/white?text=Oil+Surge' 
  }
])

// Extended Events with more stocks for Cyberpunk demo
const extendedEvents = computed(() => {
  return events.value.map(evt => {
    // Clone and add more stocks
    const moreStocks = [
      { symbol: 'MSFT', name: 'Microsoft', change: 0.45 },
      { symbol: 'GOOGL', name: 'Alphabet Inc', change: -0.23 },
      { symbol: 'AMZN', name: 'Amazon.com', change: 1.12 },
      { symbol: 'META', name: 'Meta Platforms', change: -0.88 },
      { symbol: 'INTC', name: 'Intel Corp', change: -1.50 }
    ]
    return {
      ...evt,
      stocks: [...evt.stocks, ...moreStocks]
    }
  })
})
</script>

<style scoped>
/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #0a0a0a; 
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #333; 
  border-radius: 2px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>