import React, { useState } from 'react';
import { Search, Code, Network, Sparkles, Users, TrendingUp, Filter, Star, Download, Share, Eye, ArrowRight, Zap, Brain, Globe, BarChart3, FileText, Microscope, AlertCircle, ExternalLink } from 'lucide-react';
import CitationNetwork from './components/CitationNetwork';
import { Paper } from './types';

// Crossref API 响应类型
interface CrossrefAuthor {
  given?: string;
  family?: string;
}

interface CrossrefItem {
  DOI?: string;
  title?: string[];
  author?: CrossrefAuthor[];
  'container-title'?: string[];
  published?: {
    'date-parts'?: number[][];
  };
  abstract?: string;
  subject?: string[];
}

interface CrossrefResponse {
  message: {
    items: CrossrefItem[];
    'total-results': number;
  };
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState('text');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('search');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Paper[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [filters, setFilters] = useState({
    yearFrom: '',
    yearTo: '',
    minCitations: '',
    venue: '',
    author: ''
  });
  const [favorites, setFavorites] = useState<Paper[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [showNetwork, setShowNetwork] = useState(false);


  const searchModes = [
    { id: 'text', label: 'Text Search', icon: Search, description: 'Natural language queries' },
    { id: 'code', label: 'Code Search', icon: Code, description: 'Find papers by code similarity' },
    { id: 'formula', label: 'Formula Search', icon: Microscope, description: 'Mathematical expressions' }
  ];

  // Semantic Scholar API 搜索函数
  const searchSemanticScholar = async (query: string, page: number = 1) => {
    try {
      const response = await fetch(
        `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(query)}&limit=10&offset=${(page - 1) * 10}&fields=paperId,title,authors,venue,year,abstract,url,openAccessPdf,publicationVenue,citationCount,fieldsOfStudy`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Semantic Scholar API error:', error);
      throw error;
    }
  };

  // Crossref API 搜索函数 (备用)
  const searchCrossref = async (query: string, page: number = 1): Promise<CrossrefResponse> => {
    try {
      const response = await fetch(
        `https://api.crossref.org/v1/works?query=${encodeURIComponent(query)}&rows=10&offset=${(page - 1) * 10}&sort=relevance`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Crossref API error:', error);
      throw error;
    }
  };

  // Semantic Scholar API 响应类型
  interface SemanticScholarAuthor {
    name: string;
  }

  interface SemanticScholarItem {
    paperId?: string;
    title?: string;
    authors?: SemanticScholarAuthor[];
    publicationVenue?: { name?: string };
    venue?: string;
    year?: number;
    abstract?: string;
    citationCount?: number;
    fieldsOfStudy?: string[];
    openAccessPdf?: { url?: string };
    url?: string;
  }

  interface SemanticScholarResponse {
    data: SemanticScholarItem[];
    total?: number;
  }

  // 处理Semantic Scholar搜索结果
  const processSemanticScholarResults = (data: SemanticScholarResponse): Paper[] => {
    return data.data.map((item: SemanticScholarItem, index: number) => ({
      id: item.paperId || `paper-${index}`,
      title: item.title || 'Untitled',
      authors: item.authors?.map((author: SemanticScholarAuthor) => author.name).filter(Boolean) || [],
      venue: item.publicationVenue?.name || item.venue || 'Unknown Journal',
      published: item.year?.toString() || 'Unknown',
      doi: item.paperId, // Semantic Scholar使用paperId
      abstract: item.abstract || 'No abstract available',
      citations: item.citationCount || 0,
      score: 0.85 + Math.random() * 0.1,
      tags: item.fieldsOfStudy || [],
      impact: (item.citationCount || 0) > 1000 ? 'High' : (item.citationCount || 0) > 100 ? 'Medium' : 'Low',
      trending: Math.random() > 0.8,
      pdfUrl: item.openAccessPdf?.url,
      paperUrl: item.url
    }));
  };

  // 处理Crossref搜索结果 (备用)
  const processCrossrefResults = (data: CrossrefResponse): Paper[] => {
    return data.message.items.map((item: CrossrefItem, index: number) => ({
      id: item.DOI || `paper-${index}`,
      title: item.title?.[0] || 'Untitled',
      authors: item.author?.map((author: CrossrefAuthor) => 
        `${author.given || ''} ${author.family || ''}`.trim()
      ).filter(Boolean) || [],
      venue: item['container-title']?.[0] || 'Unknown Journal',
      published: item.published?.['date-parts']?.[0]?.[0]?.toString() || 'Unknown',
      doi: item.DOI,
      abstract: item.abstract || 'No abstract available',
      citations: 0,
      score: 0.85 + Math.random() * 0.1,
      tags: item.subject || [],
      impact: Math.random() > 0.7 ? 'High' : Math.random() > 0.4 ? 'Medium' : 'Low',
      trending: Math.random() > 0.8
    }));
  };

  // 搜索处理函数
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchError('Please enter a search query');
      return;
    }

    setIsSearching(true);
    setSearchError(null);
    setCurrentPage(1);

    try {
      // 优先使用Semantic Scholar API
      const data = await searchSemanticScholar(searchQuery, 1);
      const processedResults = processSemanticScholarResults(data);
      
      setSearchResults(processedResults);
      setTotalResults(data.total || 0);
    } catch (error) {
      console.error('Semantic Scholar search failed, trying Crossref:', error);
      
      // 如果Semantic Scholar失败，使用Crossref作为备用
      try {
        const crossrefData = await searchCrossref(searchQuery, 1);
        const processedResults = processCrossrefResults(crossrefData);
        
        setSearchResults(processedResults);
        setTotalResults(crossrefData.message['total-results'] || 0);
      } catch (crossrefError) {
        setSearchError('Failed to fetch papers. Please try again.');
        setSearchResults([]);
        setTotalResults(0);
        console.error('Crossref search also failed:', crossrefError);
      }
    } finally {
      setIsSearching(false);
    }
  };

  // 加载更多结果
  const loadMoreResults = async () => {
    if (isSearching) return;

    setIsSearching(true);
    try {
      // 优先使用Semantic Scholar API
      const data = await searchSemanticScholar(searchQuery, currentPage + 1);
      const newResults = processSemanticScholarResults(data);
      
      setSearchResults(prev => [...prev, ...newResults]);
      setCurrentPage(prev => prev + 1);
    } catch (error) {
      console.error('Load more failed:', error);
      setSearchError('Failed to load more results');
    } finally {
      setIsSearching(false);
    }
  };

  // 格式化作者列表
  const formatAuthors = (authors: string[]) => {
    if (authors.length === 0) return 'Unknown Authors';
    if (authors.length <= 3) return authors.join(', ');
    return `${authors.slice(0, 2).join(', ')} et al.`;
  };

  // 获取影响因子颜色
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'Medium': return 'bg-gradient-to-r from-green-500 to-teal-500';
      case 'Low': return 'bg-gradient-to-r from-gray-500 to-gray-600';
      default: return 'bg-gradient-to-r from-purple-500 to-pink-500';
    }
  };

  // 排序功能
  const sortPapers = (papers: Paper[]) => {
    switch (sortBy) {
      case 'citations':
        return [...papers].sort((a, b) => (b.citations || 0) - (a.citations || 0));
      case 'year':
        return [...papers].sort((a, b) => parseInt(b.published || '0') - parseInt(a.published || '0'));
      case 'title':
        return [...papers].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return papers; // relevance - 保持原有顺序
    }
  };

  // 获取当前显示的论文列表
  const getDisplayPapers = () => {
    const papers = showFavorites ? favorites : searchResults;
    return sortPapers(papers);
  };

  // 查看论文详情
  const handleViewPaper = (paper: Paper) => {
    if (paper.doi) {
      window.open(`https://doi.org/${paper.doi}`, '_blank');
    } else {
      // 如果没有DOI，尝试通过标题搜索
      const searchUrl = `https://scholar.google.com/scholar?q=${encodeURIComponent(paper.title)}`;
      window.open(searchUrl, '_blank');
    }
  };

  // 下载论文 - 多重渠道确保成功率
  const handleDownloadPaper = async (paper: Paper) => {
    setNotification({ message: 'Searching for PDF...', type: 'success' });
    
    try {
      // 1. 首先尝试Semantic Scholar的直接PDF链接
      if (paper.pdfUrl) {
        window.open(paper.pdfUrl, '_blank');
        setNotification({ message: 'Opening PDF from Semantic Scholar...', type: 'success' });
        setTimeout(() => setNotification(null), 2000);
        return;
      }

      // 2. 尝试通过DOI获取PDF
      if (paper.doi) {
        try {
          // 尝试多个Sci-Hub镜像
          const sciHubMirrors = [
            'https://sci-hub.se',
            'https://sci-hub.st',
            'https://sci-hub.ru',
            'https://sci-hub.ee'
          ];
          
          for (const mirror of sciHubMirrors) {
            const sciHubUrl = `${mirror}/${paper.doi}`;
            window.open(sciHubUrl, '_blank');
            setNotification({ message: `Trying ${mirror}...`, type: 'success' });
            setTimeout(() => setNotification(null), 2000);
            return;
          }
        } catch (error) {
          console.error('Sci-Hub error:', error);
        }
      }

      // 3. 尝试通过Google Scholar
      const googleScholarUrl = `https://scholar.google.com/scholar?q=${encodeURIComponent(paper.title)}`;
      window.open(googleScholarUrl, '_blank');
      setNotification({ message: 'Opening Google Scholar search...', type: 'success' });
      setTimeout(() => setNotification(null), 2000);

      // 4. 尝试通过ResearchGate
      const researchGateUrl = `https://www.researchgate.net/search/publication?q=${encodeURIComponent(paper.title)}`;
      window.open(researchGateUrl, '_blank');

      // 5. 尝试通过arXiv (如果是arXiv论文)
      if (paper.doi && paper.doi.includes('arxiv')) {
        const arxivId = paper.doi.replace('10.48550/arXiv.', '');
        const arxivUrl = `https://arxiv.org/pdf/${arxivId}`;
        window.open(arxivUrl, '_blank');
      }

    } catch (error) {
      console.error('Download error:', error);
      setNotification({ message: 'Failed to find PDF. Trying alternative sources...', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      
      // 最后的备用方案
      const backupUrl = `https://scholar.google.com/scholar?q=${encodeURIComponent(paper.title)}`;
      window.open(backupUrl, '_blank');
    }
  };

  // 分享论文
  // 收藏功能
  const handleToggleFavorite = (paper: Paper) => {
    const isFavorite = favorites.some(fav => fav.id === paper.id);
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.id !== paper.id));
      setNotification({ message: 'Removed from favorites', type: 'success' });
    } else {
      setFavorites([...favorites, paper]);
      setNotification({ message: 'Added to favorites', type: 'success' });
    }
    setTimeout(() => setNotification(null), 2000);
  };

  // 检查是否已收藏
  const isFavorite = (paper: Paper) => {
    return favorites.some(fav => fav.id === paper.id);
  };

  // 处理网络可视化中的论文点击
  const handleNetworkPaperClick = (paper: Paper) => {
    setNotification({ message: `Selected: ${paper.title}`, type: 'success' });
    setTimeout(() => setNotification(null), 2000);
  };

  // 切换网络可视化
  const toggleNetworkView = () => {
    setShowNetwork(!showNetwork);
    if (!showNetwork) {
      setNotification({ message: 'Opening citation network visualization...', type: 'success' });
      setTimeout(() => setNotification(null), 2000);
    }
  };

  const handleSharePaper = async (paper: Paper) => {
    const shareData = {
      title: paper.title,
      text: `${paper.title} by ${formatAuthors(paper.authors)}`,
      url: paper.doi ? `https://doi.org/${paper.doi}` : undefined
    };

    try {
      if (navigator.share && shareData.url) {
        await navigator.share(shareData);
      } else {
        // 复制到剪贴板
        const shareText = `${paper.title}\n\nAuthors: ${formatAuthors(paper.authors)}\n${paper.venue ? `Published in: ${paper.venue}\n` : ''}${paper.doi ? `DOI: ${paper.doi}` : ''}`;
        await navigator.clipboard.writeText(shareText);
        
        // 显示成功消息
        setNotification({ message: 'Paper information copied to clipboard!', type: 'success' });
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (error) {
      console.error('Share error:', error);
      // 备用方案：复制到剪贴板
      try {
        const shareText = `${paper.title}\n\nAuthors: ${formatAuthors(paper.authors)}\n${paper.venue ? `Published in: ${paper.venue}\n` : ''}${paper.doi ? `DOI: ${paper.doi}` : ''}`;
        await navigator.clipboard.writeText(shareText);
        setNotification({ message: 'Paper information copied to clipboard!', type: 'success' });
        setTimeout(() => setNotification(null), 3000);
      } catch (clipboardError) {
        console.error('Clipboard error:', clipboardError);
        setNotification({ message: 'Failed to share paper information', type: 'error' });
        setTimeout(() => setNotification(null), 3000);
      }
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          <div className="flex items-center space-x-2">
            <span>{notification.message}</span>
            <button 
              onClick={() => setNotification(null)}
              className="ml-2 hover:opacity-80"
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      {/* Header */}
      <header className="backdrop-blur-xl bg-white/80 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  AcademiaAI
                </h1>
                <p className="text-xs text-gray-500">Next-gen Research Platform</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { id: 'search', label: 'Search', icon: Search },
                { id: 'network', label: 'Networks', icon: Network },
                { id: 'enhance', label: 'AI Enhance', icon: Sparkles },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id === 'network') {
                      toggleNetworkView();
                    }
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id 
                      ? 'bg-blue-100 text-blue-700 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Users className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Search Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Academic
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Intelligence</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Search millions of papers with AI, enhance your writing, and visualize research networks like never before
          </p>

          {/* Search Interface */}
          <div className="max-w-4xl mx-auto">
            {/* Search Mode Selector */}
            <div className="flex justify-center mb-6">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-2 border border-white/20 shadow-lg">
                <div className="flex space-x-2">
                  {searchModes.map(mode => (
                    <button
                      key={mode.id}
                      onClick={() => setSearchMode(mode.id)}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                        searchMode === mode.id
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                          : 'text-gray-600 hover:bg-white/50'
                      }`}
                    >
                      <mode.icon className="w-4 h-4" />
                      <div className="text-left">
                        <div className="font-medium text-sm">{mode.label}</div>
                        <div className="text-xs opacity-80">{mode.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder={
                    searchMode === 'code' ? 'def transformer_attention(query, key, value):' :
                    searchMode === 'formula' ? 'attention(Q,K,V) = softmax(QK^T/√d_k)V' :
                    'Search for "attention mechanisms in transformers"...'
                  }
                  className="w-full px-6 py-4 pl-12 pr-20 text-lg bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder:text-gray-400"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Filter className="w-4 h-4 text-gray-400" />
                  </button>
                  <button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
                  >
                    {isSearching ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Zap className="w-4 h-4" />
                    )}
                    <span>{isSearching ? 'Searching...' : 'Search'}</span>
                  </button>
                </div>
              </div>
              {searchError && (
                <div className="mt-2 flex items-center space-x-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{searchError}</span>
                </div>
              )}
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg mb-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year From</label>
                    <input
                      type="number"
                      value={filters.yearFrom}
                      onChange={(e) => setFilters({...filters, yearFrom: e.target.value})}
                      placeholder="2020"
                      className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year To</label>
                    <input
                      type="number"
                      value={filters.yearTo}
                      onChange={(e) => setFilters({...filters, yearTo: e.target.value})}
                      placeholder="2024"
                      className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Min Citations</label>
                    <input
                      type="number"
                      value={filters.minCitations}
                      onChange={(e) => setFilters({...filters, minCitations: e.target.value})}
                      placeholder="100"
                      className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Venue</label>
                    <input
                      type="text"
                      value={filters.venue}
                      onChange={(e) => setFilters({...filters, venue: e.target.value})}
                      placeholder="Nature, Science"
                      className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                    <input
                      type="text"
                      value={filters.author}
                      onChange={(e) => setFilters({...filters, author: e.target.value})}
                      placeholder="Author name"
                      className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => setFilters({yearFrom: '', yearTo: '', minCitations: '', venue: '', author: ''})}
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Clear Filters
                  </button>
                  <div className="flex items-center space-x-4">
                    <label className="text-sm font-medium text-gray-700">Sort by:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-1 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="citations">Citations</option>
                      <option value="year">Year</option>
                      <option value="title">Title</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Network Visualization */}
            {showNetwork && searchResults.length > 0 && (
              <div className="mb-8">
                <CitationNetwork
                  papers={searchResults}
                  onPaperClick={handleNetworkPaperClick}
                  width={800}
                  height={500}
                />
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {showFavorites ? 'Favorites' : (searchResults.length > 0 ? `Search Results (${totalResults} total)` : 'Search Results')}
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowFavorites(false)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      !showFavorites 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Search
                  </button>
                  <button
                    onClick={() => setShowFavorites(true)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      showFavorites 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Favorites ({favorites.length})
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Globe className="w-4 h-4" />
                <span>Powered by Semantic Scholar API</span>
              </div>
            </div>

            {getDisplayPapers().length === 0 && !isSearching && !searchError && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {showFavorites ? (
                    <Star className="w-8 h-8 text-gray-400" />
                  ) : (
                    <Search className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {showFavorites ? 'No Favorites Yet' : 'Start Your Research'}
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  {showFavorites 
                    ? 'Start searching for papers and add them to your favorites to see them here.'
                    : 'Search for academic papers using the search bar above. Try keywords like "machine learning", "transformer", or "deep learning".'
                  }
                </p>
              </div>
            )}
            
            {getDisplayPapers().map(paper => (
              <div key={paper.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer">
                        {paper.title}
                      </h4>
                      {paper.trending && (
                        <div className="flex items-center space-x-1 bg-gradient-to-r from-orange-400 to-red-400 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          <TrendingUp className="w-3 h-3" />
                          <span>Trending</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span className="font-medium">{formatAuthors(paper.authors)}</span>
                      <span>•</span>
                      <span>{paper.venue}</span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>{paper.citations?.toLocaleString() || '0'} citations</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getImpactColor(paper.impact || 'Low')}`}>
                      {paper.impact} Impact
                    </div>
                    <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-sm font-semibold">
                      {Math.round(paper.score || 0 * 100)}% match
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">{paper.abstract}</p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {paper.tags?.map(tag => (
                      <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleToggleFavorite(paper)}
                      className={`p-2 rounded-lg transition-colors group ${
                        isFavorite(paper) 
                          ? 'text-yellow-500 hover:text-yellow-600' 
                          : 'text-gray-500 hover:text-yellow-500'
                      }`}
                      title={isFavorite(paper) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Star className={`w-4 h-4 ${isFavorite(paper) ? 'fill-current' : ''}`} />
                    </button>
                    {paper.doi && (
                      <a
                        href={`https://doi.org/${paper.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                        title="View on DOI"
                      >
                        <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-blue-500" />
                      </a>
                    )}
                    <button 
                      onClick={() => handleViewPaper(paper)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                      title="View Paper"
                    >
                      <Eye className="w-4 h-4 text-gray-500 group-hover:text-blue-500" />
                    </button>
                    <div className="relative group">
                      <button 
                        onClick={() => handleDownloadPaper(paper)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                        title="Download Paper"
                      >
                        <Download className="w-4 h-4 text-gray-500 group-hover:text-green-500" />
                      </button>
                      {/* 下载选项下拉菜单 */}
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                        <div className="py-1">
                          {paper.pdfUrl && (
                            <button
                              onClick={() => {
                                window.open(paper.pdfUrl, '_blank');
                                setNotification({ message: 'Opening direct PDF...', type: 'success' });
                                setTimeout(() => setNotification(null), 2000);
                              }}
                              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2"
                            >
                              <Download className="w-4 h-4 text-green-500" />
                              <span>Direct PDF</span>
                            </button>
                          )}
                          {paper.doi && (
                            <button
                              onClick={() => {
                                window.open(`https://sci-hub.se/${paper.doi}`, '_blank');
                                setNotification({ message: 'Opening Sci-Hub...', type: 'success' });
                                setTimeout(() => setNotification(null), 2000);
                              }}
                              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2"
                            >
                              <ExternalLink className="w-4 h-4 text-blue-500" />
                              <span>Sci-Hub</span>
                            </button>
                          )}
                          <button
                            onClick={() => {
                              window.open(`https://scholar.google.com/scholar?q=${encodeURIComponent(paper.title)}`, '_blank');
                              setNotification({ message: 'Opening Google Scholar...', type: 'success' });
                              setTimeout(() => setNotification(null), 2000);
                            }}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2"
                          >
                            <Globe className="w-4 h-4 text-orange-500" />
                            <span>Google Scholar</span>
                          </button>
                          <button
                            onClick={() => {
                              window.open(`https://www.researchgate.net/search/publication?q=${encodeURIComponent(paper.title)}`, '_blank');
                              setNotification({ message: 'Opening ResearchGate...', type: 'success' });
                              setTimeout(() => setNotification(null), 2000);
                            }}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2"
                          >
                            <Network className="w-4 h-4 text-purple-500" />
                            <span>ResearchGate</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleSharePaper(paper)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                      title="Share Paper"
                    >
                      <Share className="w-4 h-4 text-gray-500 group-hover:text-purple-500" />
                    </button>
                    <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
                      <Sparkles className="w-4 h-4" />
                      <span>AI Enhance</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {searchError && (
              <div className="bg-red-100 border border-red-200 text-red-800 px-4 py-3 rounded-lg relative" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {searchError}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <button onClick={() => setSearchError(null)} className="text-red-800">
                    <svg className="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.03a1.2 1.2 0 0 1 1.697 1.697l-2.758 3.152 2.759 3.15c.146.146.217.338.217.53s-.07.384-.217.53z"/></svg>
                  </button>
                </span>
              </div>
            )}
            {totalResults > 0 && (
              <div className="text-center py-6">
                <button
                  onClick={loadMoreResults}
                  disabled={isSearching}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSearching ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <ExternalLink className="w-4 h-4" />
                  )}
                  <span>{isSearching ? 'Loading...' : `Load More (${totalResults - searchResults.length})`}</span>
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Assistant */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold">AI Research Assistant</h3>
                  <p className="text-sm opacity-90">Ready to help</p>
                </div>
              </div>
              <p className="text-sm mb-4 opacity-90">
                I can help you understand these papers, suggest related work, or enhance your writing.
              </p>
              <button 
                onClick={() => {
                  setNotification({ message: 'AI Assistant feature coming soon!', type: 'success' });
                  setTimeout(() => setNotification(null), 3000);
                }}
                className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Start Conversation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trending Topics */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                <span>Trending in AI</span>
              </h3>
              <div className="space-y-3">
                {[
                  { topic: 'Multimodal LLMs', papers: 847, trend: '+23%' },
                  { topic: 'Retrieval Augmented Generation', papers: 623, trend: '+18%' },
                  { topic: 'Constitutional AI', papers: 291, trend: '+34%' },
                  { topic: 'Chain of Thought', papers: 456, trend: '+15%' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                    <div>
                      <div className="font-medium text-gray-900">{item.topic}</div>
                      <div className="text-sm text-gray-500">{item.papers} papers</div>
                    </div>
                    <div className="text-green-600 text-sm font-semibold">{item.trend}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {[
                  { 
                    icon: Network, 
                    label: 'Visualize Citation Network', 
                    color: 'text-blue-500',
                    action: () => toggleNetworkView(),
                    disabled: searchResults.length === 0
                  },
                  { icon: FileText, label: 'Generate Summary', color: 'text-green-500', action: () => {} },
                  { icon: Brain, label: 'Find Similar Papers', color: 'text-purple-500', action: () => {} },
                  { icon: BarChart3, label: 'Impact Analysis', color: 'text-orange-500', action: () => {} }
                ].map((action, idx) => (
                  <button 
                    key={idx} 
                    onClick={action.action}
                    disabled={action.disabled}
                    className={`w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left ${
                      action.disabled ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <action.icon className={`w-5 h-5 ${action.color}`} />
                    <span className="font-medium text-gray-700">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;