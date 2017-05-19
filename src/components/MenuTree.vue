<template>
	<div>
		<ul class="tree">
		  <li v-for="item in list" :key="item">
		    <input type="checkbox" :id="item.id" />
		    <label class="tree_label fLevel" :for="item.id">{{item.label}}</label>
		    <ul v-if="item.children!=null">
		      <li v-for="itemson in item.children" :key="itemson">
		        <input type="checkbox" :id="itemson.id" />
		        <label :for="itemson.id" class="tree_label">{{itemson.label}}</label>
		        <ul v-if="itemson.children!=null">
		          <li v-for="itemgson in itemson.children" :key="itemgson"><span class="tree_label">{{itemgson.label}}</span></li>
		        </ul>
		      </li>
		    </ul>
		  </li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
			list: '',
		},
		data() {
			return {}
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

	.tree ul li { padding: 0 0 0 1em; }

	.tree > li:last-child { padding-bottom: 0; }

	.tree_label {
	  position: relative;
	  display: inline-block;
	  background: #fff;
	  }

	label.tree_label {
		cursor: pointer; 	
		font-size: 18px;
		color: #434343;
		height: 36px;
		line-height: 36px;
	}

	label.tree_label:hover {
		color: #49bdec;
		text-decoration: underline;
	}
	
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

	label.tree_label.fLevel:before {
		border: none;
	}

	:checked ~ label.tree_label.fLevel:before {
		top: 8px;
		content: '';
		display: inline-block;
		position: relative;
		width: 4px;
		height: 25px;
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