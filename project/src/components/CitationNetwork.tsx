import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { Paper } from '../types';

interface CitationNetworkProps {
  papers: Paper[];
  onPaperClick?: (paper: Paper) => void;
  width?: number;
  height?: number;
}

interface NetworkNode {
  id: string;
  paper: Paper;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface NetworkLink {
  source: string;
  target: string;
  value: number;
}

interface D3Link extends NetworkLink {
  source: NetworkNode;
  target: NetworkNode;
}

const CitationNetwork: React.FC<CitationNetworkProps> = ({ 
  papers, 
  onPaperClick, 
  width = 800, 
  height = 600 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [error, setError] = useState<string | null>(null);

  // 生成网络数据
  const generateNetworkData = useCallback(() => {
    if (papers.length === 0) return { nodes: [], links: [] };

    const nodes: NetworkNode[] = papers.map(paper => ({
      id: paper.id,
      paper
    }));

    const links: NetworkLink[] = [];
    
    // 简化的连接逻辑 - 为每篇论文连接到最近的几篇论文
    papers.forEach((paper, index) => {
      const connections = Math.min(3, papers.length - 1); // 最多连接3篇论文
      for (let i = 1; i <= connections; i++) {
        const targetIndex = (index + i) % papers.length;
        if (targetIndex !== index) {
          links.push({
            source: paper.id,
            target: papers[targetIndex].id,
            value: 1
          });
        }
      }
    });

    return { nodes, links };
  }, [papers]);

  // 渲染网络图
  useEffect(() => {
    if (!svgRef.current || papers.length === 0) return;

    try {
      setError(null);
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const networkData = generateNetworkData();
      if (networkData.nodes.length === 0) return;

      const g = svg.append("g");

      // 创建力导向布局
      const simulation = d3.forceSimulation(networkData.nodes)
        .force("link", d3.forceLink(networkData.links).id((d: NetworkNode) => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(30));

      // 创建连接线
      const link = g.append("g")
        .selectAll("line")
        .data(networkData.links)
        .enter().append("line")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", 2);

      // 创建节点组
      const node = g.append("g")
        .selectAll("g")
        .data(networkData.nodes)
        .enter().append("g")
        .call(d3.drag<SVGGElement, NetworkNode>()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

      // 添加节点圆圈
      node.append("circle")
        .attr("r", (d: NetworkNode) => Math.max(8, Math.min(20, (d.paper.citations || 0) / 100)))
        .attr("fill", (d: NetworkNode) => {
          if (selectedPaper && d.paper.id === selectedPaper.id) {
            return "#ff6b6b";
          }
          return d.paper.impact === 'High' ? "#4ecdc4" : 
                 d.paper.impact === 'Medium' ? "#45b7d1" : "#96ceb4";
        })
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .style("cursor", "pointer")
        .on("click", (event, d: NetworkNode) => {
          setSelectedPaper(d.paper);
          onPaperClick?.(d.paper);
        })
        .on("mouseover", function(event, d: NetworkNode) {
          d3.select(this).attr("stroke-width", 4);
          showTooltip(event, d);
        })
        .on("mouseout", function() {
          d3.select(this).attr("stroke-width", 2);
          hideTooltip();
        });

      // 添加节点标签
      node.append("text")
        .text((d: NetworkNode) => d.paper.title.substring(0, 15) + "...")
        .attr("x", 0)
        .attr("y", (d: NetworkNode) => Math.max(8, Math.min(20, (d.paper.citations || 0) / 100)) + 15)
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
        .attr("fill", "#333")
        .style("pointer-events", "none");

      // 更新位置
      simulation.on("tick", () => {
        link
          .attr("x1", (d: D3Link) => d.source.x)
          .attr("y1", (d: D3Link) => d.source.y)
          .attr("x2", (d: D3Link) => d.target.x)
          .attr("y2", (d: D3Link) => d.target.y);

        node
          .attr("transform", (d: NetworkNode) => `translate(${d.x},${d.y})`);
      });

      // 拖拽功能
      function dragstarted(event: d3.D3DragEvent<SVGGElement, NetworkNode, NetworkNode>, d: NetworkNode) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event: d3.D3DragEvent<SVGGElement, NetworkNode, NetworkNode>, d: NetworkNode) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event: d3.D3DragEvent<SVGGElement, NetworkNode, NetworkNode>, d: NetworkNode) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      // 工具提示
      function showTooltip(event: MouseEvent, d: NetworkNode) {
        const tooltip = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("position", "absolute")
          .style("background", "rgba(0,0,0,0.8)")
          .style("color", "white")
          .style("padding", "8px")
          .style("border-radius", "4px")
          .style("font-size", "12px")
          .style("pointer-events", "none")
          .style("z-index", "1000");

        tooltip.html(`
          <strong>${d.paper.title}</strong><br/>
          Citations: ${d.paper.citations || 0}<br/>
          Impact: ${d.paper.impact}
        `);

        tooltip
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 10) + "px");
      }

      function hideTooltip() {
        d3.selectAll(".tooltip").remove();
      }

      // 缩放功能
      const zoom = d3.zoom()
        .scaleExtent([0.1, 4])
        .on("zoom", (event) => {
          setZoomLevel(event.transform.k);
          g.attr("transform", event.transform);
        });

      svg.call(zoom);

      return () => {
        simulation.stop();
      };
    } catch (err) {
      console.error('Network visualization error:', err);
      setError('Failed to render network visualization');
    }
  }, [papers, selectedPaper, width, height, onPaperClick, generateNetworkData]);

  if (error) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠️</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Network Visualization Error</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => setError(null)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Citation Network</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Zoom: {Math.round(zoomLevel * 100)}%</span>
          <button
            onClick={() => {
              if (svgRef.current) {
                const svg = d3.select(svgRef.current);
                svg.transition().duration(750).call(
                  d3.zoom().transform,
                  d3.zoomIdentity
                );
              }
            }}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            Reset View
          </button>
        </div>
      </div>
      
      <div className="relative">
        <svg
          ref={svgRef}
          width={width}
          height={height}
          className="border border-gray-200 rounded-lg"
        />
        
        {selectedPaper && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-gray-200 shadow-lg max-w-xs">
            <h4 className="font-bold text-gray-900 mb-2">{selectedPaper.title}</h4>
            <p className="text-sm text-gray-600 mb-2">
              {selectedPaper.authors.slice(0, 3).join(", ")}{selectedPaper.authors.length > 3 ? "..." : ""}
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-blue-600">Citations: {selectedPaper.citations || 0}</span>
              <span className="text-green-600">Impact: {selectedPaper.impact}</span>
            </div>
            <button
              onClick={() => setSelectedPaper(null)}
              className="mt-2 text-xs text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-xs text-gray-600">
        <div className="text-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-1"></div>
          <span>Selected</span>
        </div>
        <div className="text-center">
          <div className="w-3 h-3 bg-teal-500 rounded-full mx-auto mb-1"></div>
          <span>High Impact</span>
        </div>
        <div className="text-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-1"></div>
          <span>Medium Impact</span>
        </div>
      </div>
    </div>
  );
};

export default CitationNetwork; 