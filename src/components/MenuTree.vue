<template>
	<div>
		<ul class="tree">
		  <li>
		    <input type="checkbox" checked="checked" id="c1" />
		    <label class="tree_label fLevel" for="c1">Level 0</label>
		    <ul>
		      <li>
		        <input type="checkbox" checked="checked" id="c2" />
		        <label for="c2" class="tree_label">Level 1</label>
		        <ul>
		          <li><span class="tree_label">Level 2</span></li>
		          <li><span class="tree_label">Level 2</span></li>
		        </ul>
		      </li>
		      <li>
		        <input type="checkbox" id="c3" />
		        <label for="c3" class="tree_label">Looong level 1 <br/>label text <br/>with line-breaks</label>
		        <ul>
		          <li><span class="tree_label">Level 2</span></li>
		          <li>
		            <input type="checkbox" id="c4" />
		            <label for="c4" class="tree_label">Specified tree item view</label>
		            <ul>
		              <li><span class="tree_label">Level 3</span></li>
		            </ul>
		          </li>
		        </ul>
		      </li>
		    </ul>
		  </li>
		  
		  
		  <li>
		    <input type="checkbox" id="c5" />
		    <label class="tree_label fLevel" for="c5">Level 0</label>
		    <ul>
		      <li>
		        <input type="checkbox" id="c6" />
		        <label for="c6" class="tree_label">Level 1</label>
		        <ul>
		          <li><span class="tree_label">Level 2</span></li>
		        </ul>
		      </li>
		      <li>
		        <input type="checkbox" id="c7" />
		        <label for="c7" class="tree_label">Level 1</label>
		        <ul>
		          <li><span class="tree_label">Level 2</span></li>
		          <li>
		            <input type="checkbox" id="c8" />
		            <label for="c8" class="tree_label">Level 2</label>
		            <ul>
		              <li><span class="tree_label">Level 3</span></li>
		            </ul>
		          </li>
		        </ul>
		      </li>
		    </ul>
		  </li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
		        list: [{
		          label: '长处和困难问卷',
		          children: [{
		            label: '二级 1-1',
		            children: [{
		              label: '三级 1-1-1'
		            }]
		          }]
		        }, {
		          label: '儿童发育筛查问卷表',
		          children: [{
		            label: '二级 2-1',
		            children: [{
		              label: '三级 2-1-1'
		            }]
		          }, {
		            label: '二级 2-2',
		            children: [{
		              label: '三级 2-2-1'
		            }]
		          }]
		        }, {
		          label: '儿童行为量表',
		          children: [{
		            label: '二级 3-1',
		            children: [{
		              label: '三级 3-1-1'
		            }]
		          }, {
		            label: '二级 3-2',
		            children: [{
		              label: '三级 3-2-1'
		            }]
		          }]
		        }],
		        defaultProps: {
		          children: 'children',
		          label: 'label'
		        }
	      }
		}
	}
</script>

<style scoped>
	.tree { 
		margin: 1em; 
		border-left: 1px solid #49bdec;
	}

	.tree input {
		position: absolute;
		clip: rect(0, 0, 0, 0);
	}

	.tree input ~ ul { display: none; }

	.tree input:checked ~ ul { display: block; }

	.tree input:checked ~ .tree_label { 
		color: #49bdec; 
		text-decoration: underline;
	}

	.tree li {
	  line-height: 1.2;
	  position: relative;
	  /*padding: 0 0 1em 1em;*/
	  }

	.tree ul li { padding: 1em 0 0 1em; }

	.tree > li:last-child { padding-bottom: 0; }

	.tree_label {
	  position: relative;
	  display: inline-block;
	  background: #fff;
	  }

	label.tree_label {
		cursor: pointer; 	
		font-size: 18px;
		height: 36px;
		line-height: 36px;
	}

	label.tree_label:hover { color: #666; }
	
	label.tree_label:before {
		display: inline-block;
		position: relative;
		z-index: 1;
		margin: 3px 8px 0 3px;
		content: '';
		line-height: 36px;

		width: 0;
		height: 0;
		border: 6px solid transparent;
		border-right-width: 0;
		border-left-color: #49bdec;
		border-left-width: 7px;
		-ms-transform: rotate(0);
		transform: rotate(0);
		transition: transform .3s ease-in-out;					
	}

	:checked ~ label.tree_label:before { 
	    -ms-transform: rotate(90deg);
	    transform: rotate(90deg);
	}

	:checked ~ label.tree_label.fLevel:before {
		top: 8px;
		content: '';
		display: inline-block;
		position: relative;
		width: 1px;
		height: 20px;
		margin: 0 10px 0 0 ;
		background: #49bdec;
		-ms-transform: rotate(0);
		transform: rotate(0);
	}

	label.tree_label:after { border-bottom: 0; }

	.tree li:last-child:before {
	  height: 1em;
	  bottom: auto;
	  }

	.tree > li:last-child:before { display: none; }
</style>